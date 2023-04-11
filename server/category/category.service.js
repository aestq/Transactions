import {Category} from '../models.js'
import CategoryDto from './category.dto.js'

class CategoryService {
  async getCategories(userId) {
    const categories = await Category.findAll({where: {userId}})
    return categories.map((category) => new CategoryDto(category))
  }

  async createCategory(userId, name, type, icon) {
    await Category.create({name, type, icon, userId})
    return this.getCategories(userId)
  }

  async updateCategory(userId, id, name, icon, type) {
    const category = await Category.findOne({where: {id}})
    category.name = name
    category.icon = icon
    category.type = type
    await category.save()
    return this.getCategories(userId)
  }

  async deleteCategory(userId, id) {
    await Category.destroy({where: {id}})
    return this.getCategories(userId)
  }
}

export default new CategoryService