import { Router } from "express"
import transactionController from "./transaction.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const transactionRouter = new Router()

transactionRouter.get('/', authMiddleware, transactionController.getTransactions)
transactionRouter.post('/', authMiddleware, transactionController.createTransaction)
transactionRouter.put('/', authMiddleware, transactionController.updateTransaction)
transactionRouter.delete('/:id', authMiddleware, transactionController.deleteTransaction)
transactionRouter.get('/search', authMiddleware, transactionController.searchTransaction)

export default transactionRouter