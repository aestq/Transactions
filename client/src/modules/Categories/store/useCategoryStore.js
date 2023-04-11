import {create} from "zustand";
import CategoryService from "@services/CategoryService";

const useCategoryStore = create(set => ({
  categories: [],
  isLoadingAll: false,
  isLoading: false,
  isLoadingDelete: false,
  getCategories: async () => {
    try {
      set({isLoadingAll: true})
      const {data} = await CategoryService.getCategories()
      set({categories: data})
    } catch (e) {
      throw e.response?.data?.message
    } finally {
      set({isLoadingAll: false})
    }
  },
  createCategory: async (name, type, icon) => {
    try {
      set({isLoading: true})
      const {data} = await CategoryService.createCategory(name, type, icon)
      set({categories: data})
    } catch (e) {
      throw e.response?.data?.message
    } finally {
      set({isLoading: false})
    }
  },
  updateCategory: async (name, type, icon, id) => {
    try {
      set({isLoading: true})
      const {data} = await CategoryService.updateCategory(name, type, icon, id)
      set({categories: data})
    } catch (e) {
      throw e.response?.data?.message
    } finally {
      set({isLoading: false})
    }
  },
  deleteCategory: async (id) => {
    try {
      set({isLoadingDelete: true})
      const {data} = await CategoryService.deleteCategory(id)
      set({categories: data})
    } catch (e) {
      throw e.response?.data?.message
    } finally {
      set({isLoadingDelete: false})
    }
  }
}))

export default useCategoryStore