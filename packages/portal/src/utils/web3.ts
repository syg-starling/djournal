import Web3 from 'web3'
const Big = require('big.js')

const testTokenABI = require('@starterapp/contract/abi/TestToken.json')
const contractRolesABI = require('@starterapp/contract/abi/ContractRoles.json')

const tokenAddr = process.env.NEXT_PUBLIC_TOKEN_ADDR
const contractRolesAddr = process.env.NEXT_PUBLIC_CONTRACT_ROLES_ADDR

let _web3
if (typeof window !== "undefined") {
  if (window.ethereum) {
    _web3 = new Web3(window.ethereum)
    window.web3 = _web3
  } else if (window.web3) {
    _web3 = window.web3
  }
}

console.log('_web3', _web3)

let _contractToken
let _contractRoles
if (_web3) {
  _contractToken = new _web3.eth.Contract(testTokenABI.abi, tokenAddr)
  _contractRoles = new _web3.eth.Contract(contractRolesABI.abi, contractRolesAddr)
}

export const web3 = _web3
export const contractToken = _contractToken
export const contractRoles = _contractRoles

export const WEI = new Big(10).pow(18)
export const GAS_LIMIT = 345577
export const GAS_PRICE = new Big(10).pow(9).times(30).toFixed(0)
export const MAX_APPROVAL_VALUE = '115792089237316200000000000000000000000000000000000000000000'
