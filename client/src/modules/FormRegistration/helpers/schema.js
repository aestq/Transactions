import * as yup from 'yup'

const message = 'Поле обязательно'

const schema = yup.object().shape({
  name: yup.string()
    .matches(/^[a-zA-Z0-9а-яА-Я-_.]+$/, "Некорректное имя")
    .required(message),
  email: yup
  .string()
  .email('Некорректная почта')
  .required(message),
  password: yup
    .string()
    .required(message)
    .min(8, "От 8 символов"),
  repeatPassword: yup.string()
    .oneOf([yup.ref('password'), null], "Пароли не совпадают")
    .required(message)
})

export default schema