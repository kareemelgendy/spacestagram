import Icon from 'components/shared/icon'
import { PostData } from 'helpers/types/post'
import { todaysDate, validateDate } from 'helpers/util'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from './date-search.module.scss'

const Error = (): JSX.Element => (
  <div className={styles.instructions}>
    Pick a date between
    <div className={styles.row}>
      <strong> 1995-06-16</strong> &nbsp;&amp;&nbsp;
      <strong>{todaysDate()}</strong>
    </div>
  </div>
)

interface DateSearchProps {
  setActiveSearch: Dispatch<SetStateAction<boolean>>
  setPosts: Dispatch<SetStateAction<PostData[]>>
}

const DateSearch = ({ setActiveSearch, setPosts }: DateSearchProps) => {
  const [error, setError] = useState(false)
  const [date, setDate] = useState('')

  const getSingleImage = async (date: string) => {
    setActiveSearch(true)
    const response = await fetch(`/api/single?date=${date}`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .catch((error) => console.log(error))
    setPosts([response.post])
  }

  const getRandomImages = async () => {
    setActiveSearch(true)
    const response = await fetch('/api/random')
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .catch((error) => console.log(error))
    setPosts(response.posts)
  }

  const handleDateSet = (e: ChangeEvent<HTMLInputElement>) => {
    if (validateDate(e.target.value)) {
      setDate(e.target.value)
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleSearch = () => {
    if (validateDate(date)) {
      getSingleImage(date)
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <div className={`${styles.container}${error ? styles.error : ''}`}>
      <Icon name="planet" size={72} />
      <div className={styles.wrapper}>
        <h2>Discover more images</h2>
        <input
          type="date"
          placeholder="YYYY-MM-DD"
          aria-label="enter a date"
          onChange={(e) => handleDateSet(e)}
        />
      </div>
      {error && <Error />}
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => handleSearch()}
          aria-label="Search for image"
        >
          <Icon name="search" size={14} fill /> Search
        </button>
        <button
          className={styles.button}
          onClick={() => getRandomImages()}
          aria-label="Get random images"
        >
          <Icon name="shuffle" size={14} /> Random
        </button>
      </div>
    </div>
  )
}

export default DateSearch
