import classNames from 'classnames';
import styles from './Loader.module.scss'

const Loader = ({valiant = 'lg', className}) => {
  return (
    <span className={classNames(
      styles.loader,
      className,
      valiant === 'sm' && styles.sm,
      valiant === 'md' && styles.md,
      valiant === 'lg' && styles.lg
    )}></span>
  )
}
 
export default Loader;