import $api from "../API/api"

class CategoryService {
  static async getCategories() {
    return $api.get(`/category`)
  }

  static async createCategory(name, type, icon) {
    return $api.post(`/category`, {
      name, icon, type
    })
  }

  static async updateCategory(name, type, icon, id) {
    return $api.put(`/category`, {
      name, icon, type, id
    })
  }

  static async deleteCategory(id) {
    return $api.delete(`/category/${id}`)
  }
}

export default CategoryService