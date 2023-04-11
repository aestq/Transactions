import styles from './Skeleton.module.scss'

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.element}/>
      <div className={styles.element}/>
      <div className={styles.element}/>
      <div className={styles.element}/>
      <div className={styles.element}/>
    </div>
  )
}

export default Skeleton