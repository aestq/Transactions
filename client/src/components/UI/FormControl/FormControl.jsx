import classNames from 'classnames';
import styles from './FormControl.module.scss'

const FormControl = ({children, error}) => {
  return (
    <div className={classNames(styles.formControl)}>
      {children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
 
export default FormControl;