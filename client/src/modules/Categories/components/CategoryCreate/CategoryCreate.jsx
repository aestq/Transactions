import Modal from "@components/Modal/Modal.jsx"
import styles from './CategoryCreate.module.scss'
import TextField from "@components/UI/TextField/TextField.jsx"
import Select from "@components/UI/Select/Select.jsx"
import Button from "@components/UI/Button/Button.jsx"
import {getIconAll, getIconOne} from "@/helpers/getIcons.jsx"
import {Controller, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import schema from '../../helpers/schema.js'
import FormControl from "@components/UI/FormControl/FormControl.jsx"
import useCategoryStore from "../../store/useCategoryStore.js"

const CategoryCreate = ({isVisible, onClose}) => {
  const {createCategory, isLoading} = useCategoryStore(
    state => ({createCategory: state.createCategory, isLoading: state.isLoading})
  )
  const {control, handleSubmit, formState: {errors}, reset} = useForm({
    defaultValues: {
      name: '',
      type: {label: 'Расход', value: 'expenses'},
      icon: {
        label: <img
          src={getIconOne(1)}
          style={{width: '20px'}}
        />,
        value: 1
      }
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit(async({name, type, icon}) => {
    await createCategory(name, type.value, icon.value)
    onClose()
    reset()
  })

  return (
    <Modal isVisible={isVisible}>
      <div className={styles.flex}>
        <Controller
          name='name'
          control={control}
          render={({field}) => (
            <FormControl error={errors.name?.message}>
              <TextField
                placeholder='Имя'
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
          )}
        />
        <div className={styles.selects}>
          <Controller
            name='type'
            control={control}
            render={({field}) => (
              <FormControl error={errors.type?.message}>
                <Select
                  options={[
                    {label: 'Расход', value: 'expenses'},
                    {label: 'Доход', value: 'income'}]}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Тип'
                />
              </FormControl>
            )}
          />
          <Controller
            name='icon'
            control={control}
            render={({field}) => (
              <FormControl error={errors.icon?.message}>
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  options={getIconAll()}
                  placeholder='Иконка'
                />
              </FormControl>
            )}
          />
        </div>
        <div className={styles.flexButton}>
          <Button onClick={onClose}>
            Назад
          </Button>
          <Button onClick={onSubmit} isloading={isLoading}>
            Ок
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CategoryCreate