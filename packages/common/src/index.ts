const Big = require('big.js')

export * from './typeorm'

export const WEI = new Big(10).pow(18)
export const GAS_LIMIT = 345577
export const GAS_PRICE = new Big(10).pow(10).toFixed(0)
