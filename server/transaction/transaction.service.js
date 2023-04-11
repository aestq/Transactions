import {Account, Category, Transaction} from '../models.js'
import TransactionDto from './transaction.dto.js'

class TransactionService {
  async getTransactions(userId, limit, offset) {
    const transactions = await Transaction.findAndCountAll({
      where: {userId},
      include: [Account, Category],
      limit, offset
    })
    let transactionsDto = transactions.rows
      .reverse()
    transactionsDto = transactionsDto.map(transaction => new TransactionDto(transaction))

    return {transactions: transactionsDto, count: transactions.count}
  }

  async createTransaction(userId, amount, categoryId, accountId, date) {
    const {name, type} = await Category.findOne({where: {id: categoryId}})
    await Transaction.create(
      {name, amount, type, date, accountId, categoryId, userId}
    )
    const account = await Account.findOne({where: {id: accountId}})
    type === 'expenses' ? account.balance -= Number(amount) : account.balance += Number(amount)
    await account.save()
    return this.getTransactions(userId, 15, 0)
  }

  async updateTransaction(userId, id, amount, date, categoryId, accountId) {
    const transaction = await Transaction.findOne({where: {id}})
    if(date) {
      date = new Date(date)
      transaction.date = date
    }
    if(categoryId) {
      transaction.categoryId = categoryId
      const {name} = await Category.findOne({where: {id: categoryId}})
      transaction.name = name
    }
    if(amount) {
      const difference = transaction.amount - amount
      const account = await Account.findOne({where: {id: transaction.accountId}})
      transaction.type === 'expenses' ? 
        account.balance += Number(difference) : account.balance -= Number(difference)
      transaction.amount = amount
      await account.save()
    }
    if(accountId) {
      const account = await Account.findOne({where: {id: accountId}})
      const accountFormer = await Account.findOne({where: {id: transaction.accountId}})
      transaction.type === 'expenses' ? 
        accountFormer.balance += Number(transaction.amount) : accountFormer.balance -= Number(transaction.amount)
      transaction.type === 'expenses' ? 
        account.balance -= Number(transaction.amount) : account.balance += Number(transaction.amount)
      transaction.accountId = accountId
      await accountFormer.save()
      await account.save()
    }

    await transaction.save()
    return this.getTransactions(userId, 15, 0)
  }

  async deleteTransaction(id, userId) {
    const transaction = await Transaction.findOne({where: {id}})
    const account = await Account.findOne({where: {id: transaction.accountId}})
    transaction.type === 'expenses' ? 
      account.balance += transaction.amount : account.balance -= transaction.amount
    await transaction.destroy()
    await account.save()
    return this.getTransactions(userId, 15, 0)
  }

  async searchTransaction(userId, search) {
    const transactions = await Transaction.findAll({
      where: {
        userId,
      },
      include: [Account, Category],
    })

    return transactions
      .filter(tran => {
        const isCategory = tran.category.name.toLowerCase().includes(search.toLowerCase())
        const isAccount = tran.account.name.toLowerCase().includes(search.toLowerCase())
        const isDate = tran.date.includes(search)
        if(isCategory || isAccount || isDate) {
          return tran
        }
      })
      .map(transaction => new TransactionDto(transaction))
  }
}

export default new TransactionService()