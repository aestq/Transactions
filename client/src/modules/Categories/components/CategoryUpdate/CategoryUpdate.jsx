import styles from './CategoryUpdate.module.scss'
import {Controller, useForm} from "react-hook-form"
import Modal from '@components/Modal/Modal'
import FormControl from "@components/UI/FormControl/FormControl.jsx"
import TextField from "@components/UI/TextField/TextField.jsx"
import Select from "@components/UI/Select/Select.jsx"
import {getIconAll, getIconOne} from "@/helpers/getIcons.jsx"
import Button from "@components/UI/Button/Button.jsx"
import useCategoryStore from "../../store/useCategoryStore.js"
import {yupResolver} from "@hookform/resolvers/yup"
import schema from "../../helpers/schema.js"

const selector = state => ({updateCategory: state.updateCategory, isLoading: state.isLoading,
  isLoadingDelete: state.isLoadingDelete, deleteCategory: state.deleteCategory})

const CategoryUpdate = ({isVisible, onClose, name, type, icon, id}) => {
  const typeLabel = type === 'expenses' ? 'Расход' : 'Доход'
  const {updateCategory, deleteCategory, isLoading, isLoadingDelete} = useCategoryStore(selector)
  const {control, handleSubmit, formState: {errors}, reset} = useForm({
    defaultValues: {
      name,
      type: {label: typeLabel, value: type},
      icon: {
        label: <img
          src={getIconOne(icon)}
          style={{width: '20px'}}
        />,
        value: icon
      }
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit(async ({name, type, icon}) => {
    await updateCategory(name, type.value, icon.value, id)
    onClose()
    reset()
  })

  const onDelete = async () => {
    await deleteCategory(id)
    onClose()
  }

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
          <Button
            isloading={isLoadingDelete}
            onClick={onDelete}
          >
            Удалить
          </Button>
          <div className={styles.basicButtons}>
            <Button onClick={onClose}>
              Назад
            </Button>
            <Button onClick={onSubmit} isloading={isLoading}>
              Ок
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CategoryUpdate