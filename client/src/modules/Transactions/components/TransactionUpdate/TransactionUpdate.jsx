import Modal from "@components/Modal/Modal.jsx"
import styles from './TransactionUpdate.module.scss'
import TextField from "@components/UI/TextField/TextField.jsx"
import Select from "@components/UI/Select/Select.jsx"
import {optionsAccount, optionsCategories} from "../../helpers/options.jsx"
import useTransactionStore from "../../store/useTransactionStore.js"
import Button from "@components/UI/Button/Button.jsx"
import {Controller, useForm} from "react-hook-form"
import FormControl from "@components/UI/FormControl/FormControl.jsx"
import {yupResolver} from "@hookform/resolvers/yup"
import schema from "../..//helpers/schema.js"

const selector = state => {
  return {
    accounts: state.accounts, categories: state.categories, updateTransaction: state.updateTransaction,
    deleteTransaction: state.deleteTransaction, isLoading: state.isLoading, isLoadingDelete: state.isLoadingDelete
  }
}

const TransactionUpdate = ({isVisible, onClose, ...transaction}) => {
  const {
    accounts,
    categories,
    updateTransaction,
    isLoading,
    isLoadingDelete,
    deleteTransaction
  } = useTransactionStore(selector)

  const {control, handleSubmit, formState: {errors}, reset} = useForm({
    defaultValues: {
      amount: transaction.amount,
      date: transaction.date,
      account: {label: transaction.account.name, value: transaction.account.id},
      category: {label: transaction.category.name, value: transaction.category.id}
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit(async ({amount, date, account, category}) => {
    await updateTransaction(
      transaction.id, account.value, category.value, amount, date
    )
    onClose()
    reset()
  })

  const onDelete = async () => {
    console.log(transaction.id)
    await deleteTransaction(transaction.id)
    onClose()
  }

  return (
    <Modal isVisible={isVisible}>
      <div className={styles.flex}>
        <div className={styles.inputs}>
          <Controller
            name='amount'
            control={control}
            render={({field}) => (
              <FormControl error={errors.amount?.message}>
                <TextField
                  placeholder='Сумма'
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            )}
          />
          <Controller
            name='date'
            control={control}
            render={({field}) => (
              <FormControl error={errors.date?.message}>
                <input
                  type='date'
                  className={styles.date}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            )}
          />
        </div>
        <div className={styles.selects}>
          <div className={styles.selectAccount}>
            <Controller
              name='account'
              control={control}
              render={({field}) => (
                <FormControl error={errors.account?.message}>
                  <Select
                    options={optionsAccount(accounts)}
                    placeholder='Счёт'
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className={styles.selectCategory}>
            <Controller
              name='category'
              control={control}
              render={({field}) => (
                <FormControl error={errors.category?.message}>
                  <Select
                    options={optionsCategories(categories)}
                    placeholder='Категория'
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              )}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button onClick={onDelete} isloading={isLoadingDelete}>
            Удалить
          </Button>
          <div className={styles.basicButtons}>
            <Button onClick={onClose}>Назад</Button>
            <Button onClick={onSubmit} isloading={isLoading}>Ок</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TransactionUpdate