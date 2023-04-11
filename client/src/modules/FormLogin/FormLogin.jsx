import Auth from '@components/Auth/Auth'
import Button from '@components/UI/Button/Button'
import FormControl from '@components/UI/FormControl/FormControl'
import TextField from '@components/UI/TextField/TextField'
import Alert from '@components/UI/Alert/Alert'
import schema from './helpers/schema'
import useUserStore from '@store/useUserStore'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'


const FormLogin = () => {
  const [error, setError] = useState('')
  const {login, isLoading} = useUserStore(
    ({login, isLoading}) => ({login, isLoading})
  )
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema),
    mode: 'onTouched'
  })

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await login(email, password)
    } catch (e) {
      setError(e)
    }
  })

  return (
    <Auth onSubmit={onSubmit}>
      {error && <Alert message={error} />}
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl
              error={errors.email?.message}
            >
              <TextField
                placeholder="Почта"
                value={value}
                onChange={onChange}
              />
            </FormControl>
          )
        }}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl
              error={errors.password?.message}
            >
              <TextField
                placeholder="Пароль"
                value={value}
                onChange={onChange}
                type="password"
              />
            </FormControl>
          )
        }}
      />
      <div className='submit'>
        <Button 
          variant='lg' 
          isloading={isLoading}
          className='submit'
          >
            Войти
          </Button>
      </div>
      <Link className='link' to="/registration">Нет аккаунта?</Link>
    </Auth>
  )
}

export default FormLogin