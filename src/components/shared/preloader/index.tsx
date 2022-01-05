import styles from './preloader.module.scss'

const Preloader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.circle} />
    </div>
  )
}

export default Preloader
