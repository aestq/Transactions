import sequelize from './database.js'
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: { type: DataTypes.STRING, unique: true },
  name: {type: DataTypes.STRING},
  password: { type: DataTypes.STRING }
})

const Token = sequelize.define('token', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING} 
  //userId
})

const Account = sequelize.define('account', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  balance: {type: DataTypes.INTEGER}
  //userId
})

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  icon: {type: DataTypes.STRING},
  type: {type: DataTypes.STRING}, //expenses || income
  //userId
})

const Transaction = sequelize.define('transaction', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  amount: {type: DataTypes.INTEGER},
  date: {type: DataTypes.DATEONLY},
  //userId
  //categoryId
  //accountId
})

User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(Account)
Account.belongsTo(User)

User.hasMany(Category)
Category.belongsTo(User)

User.hasMany(Transaction)
Transaction.belongsTo(User)

Account.hasMany(Transaction)
Transaction.belongsTo(Account)

Category.hasMany(Transaction)
Transaction.belongsTo(Category)


export {
  User, 
  Category,
  Transaction, 
  Token,
  Account
}