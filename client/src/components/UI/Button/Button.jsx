import styles from './button.module.scss'
import Loader from '@components/UI/Loader/Loader'
import classNames from 'classnames'

const Button = ({children, variant = 'md', className, isloading, ...props}) => {
  return (
    <button 
      className={classNames(
        styles.button, 
        variant === 'sm' && styles.sm,
        variant === 'md' && styles.md,
        variant === 'lg' && styles.lg,
        className,
        isloading && styles.loading
      )} 
      disabled={isloading && true}
      {...props}
    >
      {isloading ? <Loader valiant='sm'/> : children}
    </button>
  )
}
 
export default Button;