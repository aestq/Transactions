import { create } from 'zustand'
import UserService from '@services/UserService'
import axios from 'axios'

const useUserStore = create((set) => ({
  user: {},
  isLoading: false,
  isAuth: false,
  isLoadingAuth: true,
  registration: async (name, email, password) => {
    try {
      set({ isLoading: true })
      const { data } = await UserService.registration(name, email, password)
      localStorage.setItem('token', data.access)
      set({ user: data.user, isAuth: true })
    } catch (e) {
      throw e.response?.data?.message
    } finally {
      set({ isLoading: false })
    }
  },
  login: async (email, password) => {
    try {
      set({ isLoading: true })
      const { data } = await UserService.login(email, password)
      localStorage.setItem('token', data.access)
      set({ user: data.user, isAuth: true })
    } catch (e) {
      throw e.response?.data?.message
    } finally {
      set({ isLoading: false })
    }
  }, 
  logout: async () => {
    try {
      set({ isLoading: true })
      await UserService.logout()
      localStorage.removeItem('token')
      set({ user: {}, isAuth: false })
    } catch (e) {
      throw e.response?.data?.message
    } finally {
      set({ isLoading: false })
    }
  },
  checkAuth: async () => {
    try {
      set({ isLoadingAuth: true })
      const {data} = await axios.get('http://localhost:5000/api/user/refresh', {withCredentials: true})
      localStorage.setItem('token', data.access)
      set({ user: data.user, isAuth: true })
    } catch (e) {

    } finally {
      set({ isLoadingAuth: false })
    }
  }
}))

export default useUserStore