import Button from "@components/UI/Button/Button"
import FormControl from "@components/UI/FormControl/FormControl"
import TextField from '@components/UI/TextField/TextField'
import schema from "./helpers/schema"
import Auth from "@components/Auth/Auth"
import Alert from '@components/UI/Alert/Alert'
import { useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import useUserStore from '@store/useUserStore'
import './FormRegistration.scss'


const FormRegistration = () => {
  const [error, setError] = useState('')
  const {registration, isLoading, isAuth} =
    useUserStore(({registration, isLoading, isAuth}) => ({registration, isLoading, isAuth}))
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    },
    resolver: yupResolver(schema),
    mode: 'onTouched'
  })

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    try {
      await registration(name, email, password)
    } catch (e) {
      setError(e)
    }
  })

  return (
    <Auth
      onSubmit={onSubmit}
    >
      {error && <Alert message={error} />}
      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl error={errors.name?.message}>
              <TextField
                placeholder="Имя"
                value={value}
                onChange={onChange}
              />
            </FormControl>
          )
        }}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl error={errors.email?.message}>
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
            <FormControl error={errors.password?.message}>
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
      <Controller
        name="repeatPassword"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl error={errors.repeatPassword?.message}>
              <TextField
                placeholder="Повторите пароль"
                value={value}
                onChange={onChange}
                type="password"
              />
            </FormControl>
          )
        }}
      />
      <div className="submit">
        <Button
          variant="lg"
          isloading={isLoading}
          className="submit"
        >
          Начать
        </Button>
      </div>
      <Link className="link" to='/login'>Есть аккаунт? </Link>
    </Auth>
  )
}

export default FormRegistration