import TransactionsLogo from '@components/TransactionsLogo/TransactionsLogo'
import styles from './Navigation.module.scss'
import card from '@assets/card.png'
import categories from '@assets/categories.png'
import tranList from '@assets/tran-list.png'
import settings from '@assets/settings.png'
import NavigationItem from './NavigationItem/NavigationItem'

const Navigation = ({ tab, setTab }) => {
  const items = [{ name: 'Счёта', icon: card },
  { name: 'Категории', icon: categories },
  { name: 'Операции', icon: tranList },
  { name: 'Настройки', icon: settings }]

  return (
    <div className={styles.navigation}>
      <TransactionsLogo variant='sm' />
      {items.map(({ name, icon }, index) => <NavigationItem
        name={name}
        active={tab === index}
        icon={icon}
        onClick={() => setTab(index)}
        key={name}
      />)}
    </div>
  )
}

export default Navigation;