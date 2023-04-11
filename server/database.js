import {Sequelize} from 'sequelize'

const sequelize = new Sequelize(
  'tran', //name
  'postgres', // user
  '12345678', // password
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
  }
)

export default sequelize