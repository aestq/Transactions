import categoryService from './category.service.js'

class CategoryController {
  async getCategories(request, response, next) {
    try {
      const {id: userId} = request.user
      const categories = await categoryService.getCategories(userId)
      return response.json(categories)
    } catch (error) {
      next(error)
    }
  }

  async createCategory(request, response, next) {
    try {
      const {id: userId} = request.user
      const {name, type, icon} = request.body
      const categories = await categoryService.createCategory(userId, name, type, icon)
      return response.json(categories)
    } catch (error) {
      next(error)
    }
  }

  async updateCategory(request, response, next) {
    try {
      const {id: userId} = request.user
      const {name, icon, id, type} = request.body
      const categories = await categoryService.updateCategory(userId, id, name, icon, type)
      return response.json(categories)
    } catch (error) {
      next(error)
    }
  }

  async deleteCategory(request, response, next) {
    try {
      const {id: userId} = request.user
      const {id} = request.params
      const categories = await categoryService.deleteCategory(userId, id)
      return response.json(categories)
    } catch (error) {
      next(error)
    }
  }
}

export default new CategoryController()