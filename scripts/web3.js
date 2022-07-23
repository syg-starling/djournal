require('dotenv').config({ path: './.env' })
const Big = require('big.js')
const Web3 = require('web3')

const {
  WEI,
  GAS_LIMIT,
  GAS_PRICE,
} = require('../helper')

const contractRolesABI = require('../packages/contract/abi/ContractRoles.json')

const rpcUrl = process.env.RPC_URL
const tokenAddr = process.env.TOKEN_ADDR
const contractRolesAddr = process.env.CONTRACT_ROLES_ADDR

const web3Provider = new Web3.providers.HttpProvider(rpcUrl)
const web3 = new Web3(web3Provider)

const masterAccount = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY)
web3.eth.accounts.wallet.add(masterAccount)
web3.eth.defaultAccount = masterAccount.address

const contractRoles = new web3.eth.Contract(contractRolesABI.abi, contractRolesAddr)

console.log('CONTRACT_ROLES_ADDR', contractRolesAddr)

const getRole = async (role) => {
  if (!contractRoles) return
  let contractRole
  if (role === 'admin') {
    contractRole = await contractRoles.methods.ROLE_ADMIN().call()
  } else if (role === 'operator') {
    contractRole = await contractRoles.methods.ROLE_OPERATOR().call()
  } else {
    throw new Error ('invalid role')
  }
  return contractRole
}

module.exports.grantRole = async (role, address) => {
  console.log('grantRole', role, address)
  if (!contractRoles) return
  console.log('grantRole executing')
  try {
    const roleId = await getRole(role)
    const response = await contractRoles.methods.grantRole(roleId, address).send({
      from: masterAccount.address,
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
    })
    return response
  } catch (err) {
    console.log('Error grantRole', err)
    throw err
  }
}

module.exports.hasRole = async (role, address) => {
  if (!contractRoles) return
  try {
    const roleId = await getRole(role)
    const response = await contractRoles.methods.hasRole(roleId, address).call()
    return response
  } catch (err) {
    console.log('Error hasRole', err)
    throw err
  }
}
