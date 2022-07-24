import {
  Controller,
  Session,
  Get,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UserService } from './user.service'
import { User } from './user.entity'
import { SignDto } from './sign.dto'
import { UserUpdateDto } from './user-update.dto'
import { 
  generateAccessToken, 
  generateRefreshToken,
} from '../../utils/auth'

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  public async getUsers(): Promise<User[]> {
    const users = await this.userService.getUsers()
    return users
  }

  @Get('/:id')
  public async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUser(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  @Post('/sign')
  public async sign(@Session() session: Record<string, any>, @Body() signDto: SignDto): Promise<any> {
    const signatures = await this.userService.sign(signDto)
    session.address = signatures.id
    session.access = await generateAccessToken(signatures.id)
    session.refresh = await generateRefreshToken(signatures.nonce, signatures.signature)

    const response = {
      access: session.access,
    }
    return response
  }

  @Post('/refresh')
  public async refresh(@Session() session: Record<string, any>): Promise<any> {
    const { refresh } = session
    if (!refresh) {
      throw new Error('Invalid request')
    }
  
    const signatures = await this.userService.refresh(refresh)
    session.address = signatures.id
    session.access = await generateAccessToken(signatures.id)
    session.refresh = await generateRefreshToken(signatures.nonce, signatures.signature)

    const response = {
      access: session.access,
    }
    return response
  }

  @Put('/:id')
  public async updateUser(@Param('id') id: string, @Body() userUpdate: UserUpdateDto): Promise<User> {
    const user = await this.userService.updateUser(id, userUpdate)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }
}
