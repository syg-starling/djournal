import paseto from 'paseto'

import config from '../config'

const { V4 } = paseto

const issuer = config.CORS_ORIGIN

export const parseToken = async (token) => {
  try {
    const payload = await V4.verify(token, config.PASETO_PUBLIC_KEY, {
      issuer,
      clockTolerance: '2 minutes',
    })
    return payload
  } catch (err) {
    if (err.message === 'token is expired') {
      throw new Error('001401')
    } else {
      throw err
    }
  }
}

export const generateAccessToken = async (sub) => {
  const accessToken = await V4.sign({ sub }, config.PASETO_PRIVATE_KEY, {
    issuer,
    expiresIn: '30 minutes',
  })
  return accessToken
}

export const generateRefreshToken = async (nonce, signature) => {
  try {
    const token = await V4.sign({ nonce, signature, timestamp: new Date().getTime() }, config.PASETO_PRIVATE_KEY, {
      issuer,
      expiresIn: '30 days',
    })
    return token
  } catch (e) {
    throw new Error('Generate refresh token error')
  }
}
