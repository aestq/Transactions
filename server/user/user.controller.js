import tokenService from "./token.service.js"
import userService from "./user.service.js"

class UserController {
  async registration(request, response, next) {
    try {
      const {email, password, name} = request.body
      const user = await userService.registration(email, name, password)
      response.cookie('refreshtoken', user.refresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return response.json(user)
    } catch (error) {
      next(error)
    }
  }

  async login(request, response, next) {
    try {
      const {email, password} = request.body
      const user = await userService.login(email, password)
      response.cookie('refreshtoken', user.refresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return response.json(user)
    } catch (error) {
      next(error)
    }
  }

  async logout(request, response, next) {
    try {
      const {refreshtoken} = request.cookies
      await tokenService.deleteToken(refreshtoken)
      response.clearCookie('refreshtoken')
      return response.json({message: 'Успешно'})
    } catch (error) {
      next(error)
    }
  }

  async refresh(request, response, next) {
    try {
      const {refreshtoken} = request.cookies
      const userData = await userService.refresh(refreshtoken)
      response.cookie('refreshtoken', userData.refresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return response.json(userData)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()