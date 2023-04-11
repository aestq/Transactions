class TransactionDto {
  constructor(transaction) {
    this.id = transaction.id
    this.amount = transaction.amount
    this.date = transaction.date
    this.account = {
      name: transaction.account.name,
      id: transaction.accountId
    }
    this.category = {
      id: transaction.categoryId,
      name: transaction.category.name,
      type: transaction.category.type,
      icon: transaction.category.icon
    }
  }
}

export default TransactionDto