import Modal from "@components/Modal/Modal.jsx"
import useAccountStore from "../../store/useAccountStore.js"
import {Controller, useForm} from "react-hook-form"
import FormControl from "@components/UI/FormControl/FormControl.jsx"
import TextField from "@components/UI/TextField/TextField.jsx"
import Button from "@components/UI/Button/Button.jsx"
import {yupResolver} from "@hookform/resolvers/yup"
import schema from "../../helpers/schema.js"
import styles from './AccountCreate.module.scss'
import useUserStore from "@store/useUserStore.js"

const AccountCreate = ({isVisible, onClose}) => {
  const {isLoading, createAccount} = useAccountStore(
    state => ({isLoading: state.isLoading, createAccount: state.createAccount})
  )
  const {control, formState: {errors}, handleSubmit, reset} = useForm({
    defaultValues: {
      name: '',
      balance: ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit(async ({name, balance}) => {
    await createAccount(name, balance)
    onClose()
    reset()
  })

  return (
    <Modal isVisible={isVisible}>
      <div className={styles.flex}>
        <Controller
          name='name'
          control={control}
          render={({field}) => {
            return (
              <FormControl error={errors.name?.message}>
                <TextField
                  placeholder='Имя'
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            )
          }}
        />
        <Controller
          name='balance'
          control={control}
          render={({field}) => {
            return (
              <FormControl error={errors.balance?.message}>
                <TextField
                  placeholder='Баланс'
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            )
          }}
        />
        <div className={styles.flexButton}>
          <Button onClick={onClose}>Назад</Button>
          <Button
            onClick={onSubmit}
            isloading={isLoading}
          >
            Ок
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AccountCreate