import Button from '@components/UI/Button/Button'
import './Settings.scss'
import useUserStore from "@store/useUserStore.js";

const Settings = () => {
  const {user, isLoading, logout} = useUserStore(
    state => ({user: state.user, isLoading: state.isLoading, logout: state.logout})
  )

  const onClick = async () => {
    await logout()
  }

  return (
    <div className='settings'>
      <p className='name'>{user.name}</p>
      <p>{user.email}</p>
      <Button
        onClick={onClick}
        isloading={isLoading}
        className='logout'
      >
        Выйти
      </Button>
    </div>
  )
}

export default Settings