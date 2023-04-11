import * as yup from 'yup'

const message = 'Поле обязательно'

const schema = yup.object().shape({
  name: yup.string()
    .matches(/^[a-zA-Z0-9а-яА-Я\s]+$/, "Некорректное имя")
    .required(message)
})

export default schema