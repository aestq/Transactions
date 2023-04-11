import { Router } from "express"
import userRouter from "./user/user.router.js"
import accountRouter from './account/account.router.js'
import categoryRouter from './category/category.router.js'
import transactionRouter from './transaction/transactions.router.js'

const routes = new Router()

routes.use('/user', userRouter)
routes.use('/account', accountRouter)
routes.use('/category', categoryRouter)
routes.use('/transaction', transactionRouter)

export default routes