import styles from './Alert.module.scss'

const Alert = ({message}) => {
  return (
    <div className={styles.alert}>
      {message}
    </div>
  )
}
 
export default Alert;