import styles from './Auth.module.scss'

const Auth = ({children, onSubmit}) => {
  return ( 
    <form
      onSubmit={onSubmit}
      noValidate
      className={styles.form}
    >
      {children}
    </form>
  )

}
 

export default Auth;