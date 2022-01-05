import InteractionBar from 'components/shared/interaction-bar'
import { isSaved, removePost, savePost } from 'helpers/storage'
import { PostData } from 'helpers/types/post'
import Image from 'next/image'
import { forwardRef, useState } from 'react'
import ShowMore from 'components/shared/show-more'
import styles from './post.module.scss'
import Icon from 'components/shared/icon'

interface PostProps {
  post: PostData
}

const Post = forwardRef<HTMLDivElement, PostProps>(({ post }, ref) => {
  const [expanded, setExpanded] = useState(false)
  const [doubleTap, setDoubleTap] = useState(false)
  const [liked, setLiked] = useState(isSaved('likes', post))
  const [bookmarked, setBookmarked] = useState(isSaved('bookmarks', post))

  const handleInteraction = (type: string, action: boolean) => {
    type === 'likes' ? setLiked(action) : setBookmarked(action)
    action ? savePost(type, post) : removePost(type, post.date)
  }

  const handleDoubleTap = () => {
    setDoubleTap(true)
    handleInteraction('likes', true)

    setTimeout(() => {
      setDoubleTap(false)
    }, 750)
  }

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.header}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.date}>{post.date}</div>
      </div>
      <div className={styles.imageContainer} onDoubleClick={handleDoubleTap}>
        <Image
          className={styles.image}
          src={post.media_type === 'video' ? post.thumbnail_url : post.url}
          alt={post.title}
          layout="fill"
          loading="lazy"
        />
        {doubleTap && (
          <div className={styles.like}>{doubleTap && <Icon name="likes" fill size={124} />}</div>
        )}
      </div>
      <InteractionBar
        post={post}
        liked={liked}
        bookmarked={bookmarked}
        handleInteraction={handleInteraction}
      />
      <div className={styles.content}>
        {post.copyright && <p className={styles.copyright}>by {post.copyright} ©</p>}
        <p className={expanded ? styles.caption__expanded : styles.caption}>{post.explanation}</p>
        <ShowMore setExpanded={setExpanded} />
      </div>
    </div>
  )
})

Post.displayName = 'Post'
export default Post
