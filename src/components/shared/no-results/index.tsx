import Link from 'next/link'
import styles from './no-results.module.scss'

interface NoResultsProps {
  image: JSX.Element
  message: string
}

const NoResults = ({ message, image }: NoResultsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>{image}</div>
      <h2>{message}</h2>
      <div className={styles.pages}>
        <Link href="/" replace passHref>
          <div className={styles.link}>Go back home</div>
        </Link>
        &nbsp;or&nbsp;
        <Link href="/search" replace passHref>
          <div className={styles.link}>search</div>
        </Link>
      </div>
    </div>
  )
}

export default NoResults
