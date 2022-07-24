import paseto from 'paseto'

const { V4 } = paseto

// set default env if not provided
require('dotenv').config({ path: '../../.env' })

const ENV = process.env.NODE_ENV || 'development'
const PRIVATE_KEY = process.env.PRIVATE_KEY || ''

const PASETO_PRIVATE_KEY = process.env.PASETO_PRIVATE_KEY || ''
const PASETO_PUBLIC_KEY = process.env.PASETO_PUBLIC_KEY || ''

const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5000/'

export default {
  PRIVATE_KEY,
  PASETO_PRIVATE_KEY: V4.bytesToKeyObject(Buffer.from(PASETO_PRIVATE_KEY, 'base64')),
  PASETO_PUBLIC_KEY: V4.bytesToKeyObject(Buffer.from(PASETO_PUBLIC_KEY, 'base64')),
  CORS_ORIGIN,
  CLIENT_URL,
  env: {
    PRODUCTION: ENV === 'production',
    DEVELOPMENT: ENV === 'development',
    TEST: ENV === 'test',
  },
}
