import { PostData } from 'helpers/types/post'
import type { NextApiRequest, NextApiResponse } from 'next'

const { NEXT_PUBLIC_API_KEY, NEXT_PUBLIC_API_URL } = process.env

const getSingleImage = async (date: string) => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_URL}?api_key=${NEXT_PUBLIC_API_KEY}&date=${date}&thumbs=true`
  )

  return {
    post: await response.json()
  }
}

type ResponseData = {
  post: PostData
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const date = req.query.date as string
  res.status(200).json(await getSingleImage(date))
}
