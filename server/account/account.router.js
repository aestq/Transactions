import { Router } from "express"
import accountController from "./account.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const accountRouter = new Router()

accountRouter.get('/', authMiddleware, accountController.getAccounts)
accountRouter.post('/', authMiddleware, accountController.createAccount)
accountRouter.put('/', authMiddleware, accountController.updateAccount)
accountRouter.delete('/:id', authMiddleware, accountController.deleteAccount)

export default accountRouter