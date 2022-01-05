import { PostData } from 'helpers/types/post'
import type { NextApiRequest, NextApiResponse } from 'next'

const { NEXT_PUBLIC_API_KEY, NEXT_PUBLIC_API_URL } = process.env

const getRandomImages = async (count: number) => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_URL}?api_key=${NEXT_PUBLIC_API_KEY}&count=${count}&thumbs=true`
  )

  return {
    posts: await response.json().then((arr) => arr.reverse())
  }
}

type ResponseData = {
  posts: PostData[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.status(200).json(await getRandomImages(5))
}
