import {create} from "zustand"
import TransactionService from "@services/TransactionService.js"
import CategoryService from "@services/CategoryService.js";
import AccountService from "@services/AccountService.js";

const useTransactionStore = create((set, get) => ({
  transactions: [],
  categories: [],
  accounts: [],
  page: 1,
  limit: 15,
  count: 0,
  isLoadingAll: false,
  isLoading: false,
  isLoadingDelete: false,

  getTransactions: async () => {
    try {
      set({isLoadingAll: true})
      const {data} = await TransactionService.getTransactions(get().page, get().limit)
      const {data: categories} = await CategoryService.getCategories()
      const {data: accounts} = await AccountService.getAccounts()
      set({transactions: data.transactions, accounts, categories, count: Math.ceil(data.count / get().limit)})
    } catch (e) {
      throw e.response?.message
    } finally {
      set({isLoadingAll: false})
    }
  },
  createTransaction: async (amount, date, accountId, categoryId) => {
    try {
      set({isLoading: true})
      const {data} = await TransactionService.createTransaction(amount, date, accountId, categoryId)
      set({transactions: data})

    } catch (e) {
      throw e.response?.message
    } finally {
      set({isLoading: false})
    }
  },
  updateTransaction: async (id, accountId, categoryId, amount, date) => {
    try {
      set({isLoading: true})
      await TransactionService.updateTransaction(id, accountId, categoryId, amount, date)
      await get().updatePage(1)
    } catch (e) {
      throw e.response?.message
    } finally {
      set({isLoading: false})
    }
  },
  deleteTransaction: async (id) => {
    try {
      set({isLoadingDelete: true})
      await TransactionService.deleteTransaction(id)
      await get().updatePage(1)
    } catch (e) {
      throw e.response?.message
    } finally {
      set({isLoadingDelete: false})
    }
  },
  searchTransaction: async (search) => {
    try {
      set({isLoadingAll: true, count: -1})
      const {data} = await TransactionService.searchTransactions(search)
      set({transactions: data})
    } catch (e) {
      throw e.response?.message
    } finally {
      set({isLoadingAll: false})
    }
  },

  updatePage: (page) => {
    set({page})
    get().getTransactions()
  }
}))

export default useTransactionStore