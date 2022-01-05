import { PostData } from './types/post'

const formatDate = (date: Date): string => date.toISOString().split('T')[0]

export const todaysDate = (): string => formatDate(new Date())

export const validateDate = (date: string): boolean => {
  const re = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
  const earliest = new Date('1995-06-16')
  const latest = new Date(todaysDate())
  const current = new Date(date)

  return !(!re.test(date) || current < earliest || current > latest)
}

export const getDate = (current: string, length: number): string => {
  const date = new Date(current)
  const prev = date.setDate(date.getDate() - length)
  return formatDate(new Date(prev))
}

export const getShareableLink = (post: PostData) => {
  const copyright = post.copyright ? `by ${post.copyright} ` : ''
  const message = `Check out this image, ${post.title} ${copyright}from NASA. ${post.hdurl}`
  navigator.clipboard.writeText(message)
}
