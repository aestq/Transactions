import AccountDto from "./account.dto.js"
import { Account } from "../models.js"

class AccountService {
  async getAccounts(userId) {
    const accounts = await Account.findAll({where: {userId}})
    return accounts.map((account) => new AccountDto(account))
  }

  async createAccount(userId, name, balance) {
    await Account.create({name, balance, userId})
    return this.getAccounts(userId)
  }

  async updateAccount(id, userId, name, balance) {
    const account = await Account.findOne({where: {id}})
    account.name = name
    account.balance = balance
    await account.save()
    return this.getAccounts(userId)
  }

  async deleteAccount(userId, id) {
    await Account.destroy({where: {id}})
    return this.getAccounts(userId)
  }
}

export default new AccountService()