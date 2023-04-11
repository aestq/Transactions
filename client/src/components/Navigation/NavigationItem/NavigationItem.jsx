import classNames from "classnames"
import Button from "@components/UI/Button/Button"
import styles from './NavigationItem.module.scss'

const NavigationItem = ({name, active, onClick, icon}) => {
  return (
    <Button className={classNames(
      styles.item,
      active && styles.active
    )} onClick={onClick}>
      <img src={icon} className={styles.img}/>
      <span className={styles.name}>{name}</span>
    </Button>
  )
}
 
export default NavigationItem;