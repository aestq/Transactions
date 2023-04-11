import $api from "../API/api"

class AccountService {
  static async getAccounts() {
    return $api.get(`/account`)
  }

  static async createAccount(name, balance) {
    return $api.post('/account', {
      name, balance
    })
  }

  static async updateAccount(id, name, balance) {
    return $api.put('/account', {
      name, balance, id
    })
  }

  static async deleteAccount(id) {
    return $api.delete(`/account/${id}`)
  }
}

export default AccountService