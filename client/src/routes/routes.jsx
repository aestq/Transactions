import Home from '@pages/Home/Home'
import Registration from '@pages/Registration/Registration'
import Login from '@pages/Login/Login'
import Main from '@pages/Main/Main'


const publicRoutes = [
  {path: '/', element: <Home />},
  {path: '/registration', element: <Registration />},
  {path: '/login', element: <Login />}
]

const privateRoutes = [
  {path: '/', element: <Main />}
]

export {privateRoutes, publicRoutes}