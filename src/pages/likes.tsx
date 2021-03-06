import Page from 'components/layout'
import Icon from 'components/shared/icon'
import NoResults from 'components/shared/no-results'
import Post from 'components/shared/post'
import SectionHeader from 'components/shared/section-header'
import { getPosts } from 'helpers/storage'
import { PostData } from 'helpers/types/post'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const LikedPosts: NextPage = () => {
  const [data, setData] = useState<PostData[]>([])

  useEffect(() => {
    const posts = getPosts('likes')
    setData(Object.values(posts).reverse())
  }, [])

  return (
    <Page title='Likes'>
      {data.length > 0 ? (
        <>
          <SectionHeader iconName='likes' title='likes' />
          {data.map((post) => (
            <Post key={post.date} post={post} />
          ))}
        </>
      ) : (
        <NoResults image={<Icon name='likes' fill size={72} />} message='No liked images yet!' />
      )}
    </Page>
  )
}

export default LikedPosts
