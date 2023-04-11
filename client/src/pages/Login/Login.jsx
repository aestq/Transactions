import TransactionsLogo from '@components/TransactionsLogo/TransactionsLogo'
import FormLogin from '@modules/FormLogin/FormLogin'
import { useScreen } from '@hooks/useScreen'
import './Login.scss'

const Login = () => {
  const screen = useScreen()
  const variant = screen <= 770 ? 'md' : 'lg'

  return (
    <div className="login">
      <TransactionsLogo variant={variant} />
      <FormLogin />
    </div>
  )
}
 
export default Login;