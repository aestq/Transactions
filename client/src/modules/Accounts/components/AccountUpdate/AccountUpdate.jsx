import Modal from "@components/Modal/Modal.jsx"
import useAccountStore from "../../store/useAccountStore.js"
import {Controller, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import schema from "../../helpers/schema.js"
import styles from './AccountUpdate.module.scss'
import FormControl from "@components/UI/FormControl/FormControl.jsx"
import TextField from "@components/UI/TextField/TextField.jsx"
import Button from "@components/UI/Button/Button.jsx"
import useUserStore from "@store/useUserStore.js";

const AccountUpdate = ({isVisible, onClose, name, balance, id}) => {
  const {isLoading, updateAccount, deleteAccount, isLoadingDelete} = useAccountStore(
    state => ({isLoading: state.isLoading, updateAccount: state.updateAccount,
      deleteAccount: state.deleteAccount, isLoadingDelete:  state.isLoadingDelete})
  )

  const {control, formState: {errors}, handleSubmit} = useForm({
    defaultValues: {
      name,
      balance
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onDelete = async () => {
    await deleteAccount(id)
    onClose()
  }

  const onSubmit = handleSubmit(async ({name, balance}) => {
    await updateAccount(id, name, balance)
    onClose()
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
          <div className={styles.delete}>
            <Button
              onClick={onDelete}
              isloading={isLoadingDelete}
            >
              Удалить
            </Button>
          </div>
          <div className={styles.basicButtons}>
            <Button onClick={onClose}>Назад</Button>
            <Button
              onClick={onSubmit}
              isloading={isLoading}
            >
              Ок
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AccountUpdate