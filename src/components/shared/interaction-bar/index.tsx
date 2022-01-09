import Icon from 'components/shared/icon'
import { PostData } from 'helpers/types/post'
import { getShareableLink } from 'helpers/util'
import styles from './interaction-bar.module.scss'

interface InteractionBarProps {
  post: PostData
  liked: boolean
  bookmarked: boolean
  handleInteraction: any
}

const InteractionBar = ({ post, liked, bookmarked, handleInteraction }: InteractionBarProps) => (
  <div className={styles.container}>
    <div className={styles.buttons}>
      <Icon
        name='likes'
        fill={liked}
        aria-label={liked ? 'Unlike Post' : 'like Post'}
        onClick={() => handleInteraction('likes', !liked)}
      />
      <Icon name='share' aria-label='Copy Share Link' onClick={() => getShareableLink(post)} />
    </div>
    <Icon
      name='bookmarks'
      fill={bookmarked}
      aria-label={bookmarked ? 'Unbookmark Post' : 'Bookmark Post'}
      onClick={() => handleInteraction('bookmarks', !bookmarked)}
    />
  </div>
)

export default InteractionBar
