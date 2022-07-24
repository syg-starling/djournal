import Web3 from 'web3'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { ConfigService } from '~/src/services/config/config.service'
import { User } from './user.entity'
import { SignDto } from './sign.dto'
import { 
  parseToken,
} from '../../utils/auth'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private configService: ConfigService
  ) {}

  public async sign(signDto: SignDto): Promise<any> {
    const { nonce, signature, id, refresh } = signDto
    if (!id) {
      throw new Error('Invalid request')
    }

    let nonceInput = nonce
    let signatureInput = signature

    const rpcUrl = this.configService.get('RPC_URL')

    const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl))
    let recoveredAddress
    if (refresh) {
      try {
        const payload:any = await parseToken(refresh)
        recoveredAddress = await web3.eth.accounts.recover(payload.nonce, payload.signature)
        nonceInput = payload.nonce
        signatureInput = payload.signature
      } catch (err) {
        if (err.message === '001401') { // display better context error
          throw new Error('001403')
        }
      }
    } else if (nonce && signature) {
      recoveredAddress = await web3.eth.accounts.recover(nonce, signature)
    }
    
    const lowerCaseAddress = recoveredAddress.toLowerCase()
    let user = await this.userRepo.findOneBy({ id: lowerCaseAddress })
    if (!user) {
      const newUser = this.userRepo.create({ id: lowerCaseAddress })
      user = await this.userRepo.save(newUser)
    }
    return {
      id: lowerCaseAddress,
      nonce: nonceInput,
      signature: signatureInput,
    }
  }

  public async refresh(token: string): Promise<any> {
    const rpcUrl = this.configService.get('RPC_URL')

    const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl))
    const payload: any = await parseToken(token)
    const address = await web3.eth.accounts.recover(payload.nonce, payload.signature)
  
    const lowerCaseAddress = address.toLowerCase()

    const user = await this.userRepo.findOneBy({ id: lowerCaseAddress })
    if (!user || !user.id) throw new Error('000401')
    
    return {
      id: lowerCaseAddress,
      nonce: payload.nonce,
      signature: payload.signature,
    }
  }

  public async updateUser(id: string, params: Record<string, any>): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ id })
    if (!user) throw new Error('000401')
    user.name = params.name
    return await this.userRepo.save(user)
  }

  public async getUser(id: string): Promise<User | null> {
    return await this.userRepo.findOneBy({ id })
  }

  public async getUsers(): Promise<User[]> {
    return await this.userRepo.find()
  }
}
