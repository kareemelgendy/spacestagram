import PageLayout from 'components/layout'
import Icon from 'components/shared/icon'
import NoResults from 'components/shared/no-results'
import Post from 'components/shared/post'
import SectionHeader from 'components/shared/section-header'
import { getPosts } from 'helpers/storage'
import { PostData } from 'helpers/types/post'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const SavedPosts: NextPage = () => {
  const [data, setData] = useState<PostData[]>([])

  useEffect(() => {
    const posts = getPosts('bookmarks')
    setData(Object.values(posts).reverse())
  }, [])

  return (
    <PageLayout title="Bookmarks">
      {data.length > 0 ? (
        <>
          <SectionHeader iconName="bookmarks" title="bookmarks" />
          {data.map((post, key) => (
            <Post key={key} post={post} />
          ))}
        </>
      ) : (
        <NoResults
          image={<Icon name="bookmarks" fill size={72} />}
          message="No bookmarked images yet!"
        />
      )}
    </PageLayout>
  )
}

export default SavedPosts
