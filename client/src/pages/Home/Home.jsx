import Button from '@components/UI/Button/Button'
import TransactionsLogo from '@components/TransactionsLogo/TransactionsLogo'
import { ReactComponent as Wave } from "../../assets/wave.svg";
import { useNavigate } from 'react-router-dom'
import { useScreen } from '@hooks/useScreen'
import './Home.scss'

const Home = () => {
  const navigate = useNavigate()
  const screen = useScreen()
  let variant = screen <= 770 ? 'md' : 'lg'

  return (
    <div className="home">
      <Button 
        className="login_button"
        onClick={() => navigate('/login')}
      >
        Войти
      </Button>
      <TransactionsLogo 
        variant={variant}
      />
      <Button 
        className="registration_button" 
        variant={variant}
        onClick={() => navigate('/registration')}
      >
        Начать
      </Button>
      <div className='wave' />
      <Wave className="svg"/>
    </div>
  )
}

export default Home;