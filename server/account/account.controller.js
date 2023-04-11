import accountService from "./account.service.js"

class AccountController {
  async getAccounts(request, response, next) {
    try {
      const {id: userId} = request.user
      const accounts = await accountService.getAccounts(userId)
      return response.json(accounts)
    } catch (error) {
      next(error)
    }
  }

  async createAccount(request, response, next) {
    try {
      const { name, balance } = request.body
      const {id: userId} = request.user
      const accounts = await accountService.createAccount(userId, name, balance)
      return response.json(accounts)
    } catch (error) {
      next(error)
    }
  }

  async updateAccount(request, response, next) {
    try {
      const { id, name, balance } = request.body
      const {id: userId} = request.user
      const accounts = await accountService.updateAccount(id, userId, name, balance)
      return response.json(accounts)
    } catch (error) {
      next(error)
    }
  }

  async deleteAccount(request, response, next) {
    try {
      const { id } = request.params
      const {id: userId} = request.user
      const accounts = await accountService.deleteAccount(userId, id)
      return response.json(accounts)
    } catch (error) {
      next(error)
    }
  }
}

export default new AccountController()