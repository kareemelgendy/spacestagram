import Icon from 'components/shared/icon'
import styles from './section-header.module.scss'

interface SectionHeaderProps {
  title: string
  iconName?: string
  onClick?: () => void
}

const SectionHeader = ({ title, iconName, onClick }: SectionHeaderProps) => {
  return (
    <div className={styles.container}>
      {iconName && (
        <Icon
          name={iconName}
          fill={iconName === 'likes' || iconName === 'bookmarks'}
          size={32}
          onClick={onClick}
        />
      )}
      <h2>{title}</h2>
    </div>
  )
}

export default SectionHeader
