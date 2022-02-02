/* eslint-disable react/no-array-index-key */
import Page from 'components/layout'
import Post from 'components/shared/post'
import Preloader from 'components/shared/preloader'
import SectionHeader from 'components/shared/section-header'
import { PostData } from 'helpers/types/post'
import { getDate, todaysDate } from 'helpers/util'
import type { NextPage } from 'next'
import { useCallback, useRef, useState } from 'react'
import styles from 'styles/layout.module.scss'

export async function getServerSideProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PROD}/api/range?date=${getDate(todaysDate(), 5)}`
  ).then((res) => res.json())

  return {
    props: {
      images: response.posts,
      newDate: response.date
    }
  }
}

interface FeedProps {
  images: PostData[]
  newDate: string
}

const Home: NextPage<FeedProps> = ({ images, newDate }: FeedProps) => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<PostData[]>(images)
  const [date, setDate] = useState(newDate)
  const postsLoaded = posts?.length > 0

  const getPosts = async () => {
    setLoading(true)
    const response = await fetch(`/api/range?date=${date}`).then((res) => res.json())
    setPosts([...response.posts])
    setDate(response.date)
    setLoading(false)
  }

  // Infinite scroll
  const observer = useRef<IntersectionObserver | null>(null)
  const postRef = useCallback(
    (post) => {
      if (loading) return
      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getPosts()
        }
      })

      if (post) {
        observer.current.observe(post)
      }
    },
    [loading]
  )

  return (
    <Page title='Spacestagram'>
      {postsLoaded ? (
        <>
          <SectionHeader iconName='planet' title='final frontier' />
          {posts.map((post, key) => (posts.length - 3 === key ? (
            <Post key={post.title} post={post} ref={postRef} />
          ) : (
            <Post key={post.title} post={post} />
          )))}
          {loading && <Preloader />}
        </>
      ) : (
        <div className={styles.wrapper}>
          <Preloader />
        </div>
      )}
    </Page>
  )
}

export default Home
