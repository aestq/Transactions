import * as yup from 'yup'

const message = 'Поле обязательно'

const schema = yup.object().shape({
  email:  yup
  .string()
  .email('Некорректная почта')
  .required(message),
  password: yup
    .string()
    .required(message)
    .min(8, "От 8 символов")
  })

export default schema