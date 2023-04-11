import styles from './Modal.module.scss'
import classNames from "classnames"

const Modal = ({isVisible, children}) => {

  return !isVisible ? null : (
    <div className={classNames(
      styles.modal,

    )}>
      {children}
    </div>
  )
}

export default Modal