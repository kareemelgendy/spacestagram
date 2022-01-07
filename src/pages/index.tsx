import Page from 'components/layout'
import Post from 'components/shared/post'
import Preloader from 'components/shared/preloader'
import SectionHeader from 'components/shared/section-header'
import { PostData } from 'helpers/types/post'
import { getDate, todaysDate } from 'helpers/util'
import type { NextPage } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from 'styles/Home.module.scss'

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<PostData[]>([])
  const [date, setDate] = useState(getDate(todaysDate(), 5))

  const postsLoaded = posts.length > 0

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading]
  )

  const getPosts = async () => {
    setLoading(true)
    const response = await fetch(`/api/range?date=${date}`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .catch((error) => console.log(error))
    setPosts([...response.posts])
    setDate(response.date)
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Page title="Spacetagram">
      {postsLoaded ? (
        <>
          <SectionHeader iconName="planet" title="final frontier" />
          {posts.map((post, key) =>
            posts.length - 2 === key ? (
              <Post key={key} post={post} ref={postRef} />
            ) : (
              <Post key={key} post={post} />
            )
          )}
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
