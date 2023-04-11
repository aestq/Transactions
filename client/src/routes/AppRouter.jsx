import {Routes, Route, useNavigate} from 'react-router-dom'
import {privateRoutes, publicRoutes} from './routes.jsx'
import useUserStore from '@store/useUserStore'
import NotFound from '@pages/NotFound/NotFound'
import {useEffect} from "react";
import AppSkeleton from "@components/AppSkeleton/AppSkeleton.jsx";

const selector = state => ({
  isAuth: state.isAuth,
  isLoadingAuth: state.isLoadingAuth
})

const AppRouter = () => {
  const {isAuth, isLoadingAuth} = useUserStore(selector)
  const navigate = useNavigate()


  useEffect(() => {
    if(isAuth) {
      navigate('/')
    }
  }, [isAuth])

  if(isLoadingAuth) {
    return <AppSkeleton />
  }


  return (
    <Routes>
      {isAuth ? 
        privateRoutes.map(route => <Route {...route} key={route.path}/>)
        :
        publicRoutes.map(route => <Route {...route} key={route.path}/>)}
        <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}
 
export default AppRouter