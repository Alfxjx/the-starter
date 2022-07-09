// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Axios from 'axios';

Axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://home.abandon.work' : 'http://localhost:3000';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const pay = await Axios.post('/payment', req.body)
  await res.status(200).json(pay.data)
}
