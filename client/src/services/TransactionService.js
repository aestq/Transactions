import $api from "../API/api"

class TransactionService {
  static async getTransactions(page, limit) {
    return $api.get(`/transaction?page=${page}&limit=${limit}`)
  }

  static async createTransaction(amount, date, accountId, categoryId) {
    return $api.post(`/transaction`, {
      date, accountId, categoryId, amount
    })
  }

  static async updateTransaction(id, accountId, categoryId, amount, date) {
    return $api.put(`/transaction`, {
      categoryId, accountId, id, amount, date
    })
  }

  static async deleteTransaction(id) {
    return $api.delete(`/transaction/${id}`)
  }

  static async searchTransactions(search) {
    return $api.get(`transaction/search?search=${search}`)
  }
}

export default TransactionService