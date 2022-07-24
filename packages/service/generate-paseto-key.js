const crypto = require('crypto')
const { promisify } = require('util')
const paseto = require('paseto')

const { V4 } = paseto
const generateKeyPair = promisify(crypto.generateKeyPair)

const main = async () => {
  const { privateKey, publicKey } = await generateKeyPair('ed25519')
  console.log('INIT KEY')
  console.log('private', V4.keyObjectToBytes(privateKey).toString('base64'))
  console.log('public', V4.keyObjectToBytes(publicKey).toString('base64'))
}

main()