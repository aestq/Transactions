import { Router } from "express"
import categoryController from "./category.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const categoryRouter = new Router()

categoryRouter.get('/', authMiddleware, categoryController.getCategories)
categoryRouter.post('/', authMiddleware, categoryController.createCategory)
categoryRouter.put('/', authMiddleware, categoryController.updateCategory)
categoryRouter.delete('/:id', authMiddleware, categoryController.deleteCategory)

export default categoryRouter