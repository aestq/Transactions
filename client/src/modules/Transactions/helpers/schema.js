import * as yup from 'yup'

const message = 'Поле обязательно'

const schema = yup.object().shape({
  amount: yup.string()
    .matches(/^[0-9]+$/, "Только число")
    .required(message),
  date: yup.string()
    .required(message),
  account: yup.object()
    .nullable()
    .required(message),
  category: yup.object()
    .nullable()
    .required(message)
})

export default schema