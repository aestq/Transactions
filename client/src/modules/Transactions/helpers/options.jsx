import {getIconOne} from "@/helpers/getIcons.jsx"

const optionsAccount = (accounts) =>
  accounts.map(account => ({label: account.name, value: account.id}))


const TitleOption = ({name, icon}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '3px'
      }}
    >
      <img src={getIconOne(icon)} style={{width: '20px'}}/>
      {name}
    </div>
  )
}

const optionsCategories = (categories) =>
  categories.map(category => (
    {label: <TitleOption name={category.name} icon={category.icon} />, value: category.id}
    ))

export {optionsAccount, optionsCategories}