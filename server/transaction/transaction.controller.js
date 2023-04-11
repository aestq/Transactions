import transactionService from "./transaction.service.js"

class TransactionController {
  async getTransactions(request, response, next) {
    try {
      const {id: userId} = request.user
      let {page, limit} = request.query
      page = page ?? 1
      limit = limit ?? 15
      const offset = page * limit - limit
      const transactions = await transactionService.getTransactions(userId, limit, offset)
      return response.json(transactions)
    } catch (error) {
      next(error)
    }
  }

  async createTransaction(request, response, next) {
    try {
      const {id: userId} = request.user
      const {amount, categoryId, accountId, date} = request.body
      const transactions = await transactionService.createTransaction(userId, amount, categoryId, accountId, date)
      return response.json(transactions)
    } catch (error) {
      next(error)
    }
  }

  async updateTransaction(request, response, next) {
    try {
      const {id: userId} = request.user
      const {id, amount, date, categoryId, accountId} = request.body
      const transactions = await transactionService.updateTransaction(
        userId, id, amount, date, categoryId, accountId
      )
      return response.json(transactions)
    } catch (error) {
      next(error)
    }
  }

  async deleteTransaction(request, response, next) {
    try {
      const {id: userId} = request.user
      const {id} = request.params
      const transactions = await transactionService.deleteTransaction(id, userId)
      return response.json(transactions)
    } catch (error) {
      next(error)
    }
  }

  async searchTransaction(request, response, next) {
    try {
      const {id: userId} = request.user
      const {search} = request.query
      const transactions = await transactionService.searchTransaction(userId, search)
      return response.json(transactions)
    } catch (e) {
      next(e)
    }
  }
}

export default new TransactionController()