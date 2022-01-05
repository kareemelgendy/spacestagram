import { PostData } from 'helpers/types/post'
import { getDate, todaysDate } from 'helpers/util'
import type { NextApiRequest, NextApiResponse } from 'next'

const { NEXT_PUBLIC_API_KEY, NEXT_PUBLIC_API_URL } = process.env

const getImages = async (startDate: string) => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_URL}?api_key=${NEXT_PUBLIC_API_KEY}&start_date=${startDate}&end_date=${todaysDate()}&thumbs=true`
  )

  return {
    posts: await response.json().then((arr) => arr.reverse()),
    date: getDate(startDate, 6)
  }
}

type ResponseData = {
  posts: PostData[]
  date: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const date = req.query.date as string
  res.status(200).json(await getImages(date))
}
