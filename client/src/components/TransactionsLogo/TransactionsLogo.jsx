import styles from './transactionsLogo.module.scss'
import Logo from '@assets/transactionLogo.png'
import classNames from 'classnames'

const TransactionsLogo = ({className, variant = 'md'}) => {
  return (
    <div 
      className={classNames(styles.flex, className)}>
      <img src={Logo} className={classNames(
        styles.img,
        variant === 'sm' && styles.img_sm,
        variant === 'md' && styles.img_md,
        variant === 'lg' && styles.img_lg
      )} />
      <p className={classNames(
        styles.text, 
        variant === 'sm' && styles.sm,
        variant === 'md' && styles.md,
        variant === 'lg' && styles.lg
      )}>Transactions</p>
    </div>
  )
}
 
export default TransactionsLogo;