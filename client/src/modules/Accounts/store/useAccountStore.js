import {create} from "zustand"
import AccountService from "@services/AccountService.js"

const useAccountStore = create((set) => ({
  accounts: [],
  isLoadingAll: false,
  isLoading: false,
  isLoadingDelete: false,

  getAccounts: async () => {
    try {
      set({isLoadingAll: true})
      const {data} = await AccountService.getAccounts()
      set({accounts: data})
    } catch (e) {
      throw e.response?.data?.message
    } finally {
      set({isLoadingAll: false})
    }
  },

  createAccount: async (name, balance) => {
    try {
      set({isLoading: true})
      const {data} = await AccountService.createAccount(name, balance)
      set({accounts: data})
    } catch (e) {
      throw e.response?.data?.message
    } finally {
      set({isLoading: false})
    }
  },

  updateAccount: async (id, name, balance) => {
    try {
      set({isLoading: true})
      const {data} = await AccountService.updateAccount(id, name, balance)
      set({accounts: data})
    } catch (e) {
      throw e.response?.data?.message
    } finally {
      set({isLoading: false})
    }
  },

  deleteAccount: async (id) => {
    try {
      set({isLoadingDelete: true})
      const {data} = await AccountService.deleteAccount(id)
      set({accounts: data})
    } catch (e) {
      throw e.response?.data?.message
    } finally {
      set({isLoadingDelete: false})
    }
  }
}))

export default useAccountStore