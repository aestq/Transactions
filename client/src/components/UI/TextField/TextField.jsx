import styles from './textField.module.scss'
import classNames from 'classnames'

const TextField = ({ className, ...props }) => {
  return (
    <input
      className={classNames(styles.input, className)}
      {...props}
    />
  )
}

export default TextField;