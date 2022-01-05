import PageLayout from 'components/layout'
import DateSearch from 'components/shared/date-search'
import Post from 'components/shared/post'
import Preloader from 'components/shared/preloader'
import SectionHeader from 'components/shared/section-header'
import { PostData } from 'helpers/types/post'
import { NextPage } from 'next'
import { useState } from 'react'
import styles from 'styles/Home.module.scss'

const Search: NextPage = () => {
  const [posts, setPosts] = useState<PostData[]>([])
  const [activeSearch, setActiveSearch] = useState(false)

  const resetSearch = () => {
    setActiveSearch(false)
    setPosts([])
  }

  const postsLoaded = posts.length > 0

  return (
    <PageLayout title="Search">
      {postsLoaded ? (
        <>
          <SectionHeader
            iconName="chevron-left"
            title={posts.length > 1 ? 'Search results' : `Image from ${posts[0].date}`}
            onClick={() => resetSearch()}
          />
          {posts.map((post, key) => (
            <Post key={key} post={post} />
          ))}
        </>
      ) : (
        <div className={styles.wrapper}>
          {activeSearch ? (
            <Preloader />
          ) : (
            <DateSearch setActiveSearch={setActiveSearch} setPosts={setPosts} />
          )}
        </div>
      )}
    </PageLayout>
  )
}

export default Search
