import jwt from 'jsonwebtoken'
import { Token } from "../models.js"

class TokenService {
  generateTokens(payload) {
    const access = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '1h'})
    const refresh = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'})
    return {access, refresh}
  }

  async saveToken(refresh, userId) {
    const tokenData = await Token.findOne({where: {userId}})
    if(tokenData) {
      tokenData.refreshToken = refresh
      return tokenData.save()
    }

    const token = await Token.create({userId, refreshToken: refresh})
    return token
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY)
      return userData
    } catch {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY)
      return userData
    } catch {
      return null
    }
  }

  async deleteToken(refresh) {
    await Token.destroy({where: {refreshToken: refresh}})
  }

  async findToken(refresh) {
    const token = await Token.findOne({where: {refreshToken: refresh}})
    return token
  }
}

export default new TokenService()