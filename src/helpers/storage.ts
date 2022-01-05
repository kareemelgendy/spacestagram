import { PostData } from './types/post'

export const getPosts = (type: string): Record<string, PostData> => {
  if (typeof window !== undefined) {
    const data = localStorage.getItem(type)
    return data ? JSON.parse(data) : []
  }
  return {}
}

export const updatePosts = (type: string, posts: Record<string, PostData>): void => {
  if (typeof window !== undefined) {
    localStorage.setItem(type, JSON.stringify(posts))
  }
}

export const isSaved = (type: string, post: PostData): boolean => {
  const posts = getPosts(type)
  const keys = new Set(posts ? Object.keys(posts) : [])
  return keys.has(post.date)
}

export const savePost = (type: string, post: PostData): void => {
  const posts = getPosts(type)
  if (!(post.date in posts)) {
    updatePosts(type, { ...posts, [post.date]: post })
  }
}

export const removePost = (type: string, date: string): void => {
  const posts = getPosts(type)
  if (date in posts) {
    delete posts[date]
  }
  updatePosts(type, { ...posts })
}
