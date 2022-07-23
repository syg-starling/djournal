/* eslint-disable no-unused-vars */
const Big = require('big.js')

const {
  WEI,
} = require('../helper')

const {
  grantRole,
  hasRole,
} = require('./web3')

const testGrantRole = async (role, address) => {
  const txGrantRole = await grantRole(role, address)
  console.log('Grant Role')
  console.log(txGrantRole)

  const res = await hasRole(role, address)
  console.log('Has Role')
  console.log(address, role, res)
}
testGrantRole('admin', '0xfCc33f82F2F257EA9D491Ac7451F709B51249498').then(process.exit)
