import {Account, Category, User} from "../models.js"
import bcrypt from 'bcrypt'
import tokenService from './token.service.js'
import UserDto from './user.dto.js'
import ApiError from "../error/ApiError.js"

class UserService {
  async registration(email, name, password) {
    const candidate = await User.findOne({where: {email}})

    if(candidate) {
      throw ApiError.badRequest(`Пользователь ${email} уже зарегистрирован`)
    }

    const hashPassword = await bcrypt.hash(password, 4)
    const user = await User.create({email, name, password: hashPassword })
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(tokens.refresh, userDto.id)
    await Account.create({name: 'Наличные', balance: 1000, userId: userDto.id})
    await Category.create({name: 'Продукты', icon: '1', type: 'expenses', userId: userDto.id})

    return {...tokens, user: userDto}
  }

  async login(email, password) {
    const user = await User.findOne({where: {email}})

    if(!user) {
      throw ApiError.badRequest(`Пользователя ${email} не существует`)
    }

    const isCorrect = await bcrypt.compare(password, user.password)
    if(!isCorrect) {
      throw ApiError.badRequest('Неверный пароль')
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(tokens.refresh, userDto.id)

    return {...tokens, user: userDto}
  }

  async logout(refresh) {
    await tokenService.deleteToken(refresh)
  }

  async refresh(token) {
    if(!token) {
      throw ApiError.unauthorized()
    }

    const userData = tokenService.validateRefreshToken(token)
    const tokenFromDb = await tokenService.findToken(token)
    if(!userData || !tokenFromDb) {
      throw ApiError.unauthorized()
    }

    const user = await User.findOne({where: {email: userData.email}})
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(tokens.refresh, userDto.id)

    return {...tokens, user: userDto}
  }
}

export default new UserService()