import Icon from 'components/shared/icon'
import { Dispatch, SetStateAction, useState } from 'react'
import styles from './show-more.module.scss'

interface ShowMoreProps {
  setExpanded: Dispatch<SetStateAction<boolean>>
}

const ShowMore = ({ setExpanded }: ShowMoreProps) => {
  const [toggled, setToggled] = useState(false)

  const handleToggle = () => {
    setExpanded(!toggled)
    setToggled(!toggled)
  }

  return (
    <>
      {!toggled && <div className={styles.gradient} />}
      <div className={styles.container}>
        <button type='button' className={styles.wrapper} onClick={handleToggle}>
          <Icon name={toggled ? 'chevron-up' : 'chevron-down'} />
          {toggled ? 'Show less' : 'Show more'}
        </button>
      </div>
    </>
  )
}

export default ShowMore
