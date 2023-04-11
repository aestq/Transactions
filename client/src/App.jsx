import { BrowserRouter } from "react-router-dom"
import AppRouter from "@/routes/AppRouter"
import useUserStore from '@store/useUserStore'
import { useEffect } from "react"

const selector = state => state.checkAuth

const App = () => {
  const { checkAuth } = useUserStore(selector)
  
  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
