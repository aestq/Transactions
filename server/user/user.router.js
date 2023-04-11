import { Router } from "express"
import userController from "./user.controller.js"

const userRouter = new Router()

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout)
userRouter.get('/refresh', userController.refresh)

export default userRouter