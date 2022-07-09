// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Axios from 'axios';

Axios.defaults.baseURL = 'http://localhost:3000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cafe = await Axios.get('/cafe')
  await res.status(200).json(cafe.data)
}
