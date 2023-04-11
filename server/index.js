import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './database.js'
import errorMiddleware from './middleware/error.middleware.js'
import routes from './routes.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(express.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(cookieParser())
app.use('/api', routes)
app.use('/static', express.static('./static'))
app.use(errorMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server work on ${PORT} port`))
  } catch (error) {
    console.log(error)
  }
}

start()