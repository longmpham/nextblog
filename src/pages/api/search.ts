// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewsResponse } from '@/models/NewsArticles'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const searchQuery = req.query.q?.toString()

  if (!searchQuery) {
    return res.status(400).json({ error: "please provide a search query"})
  }

  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`)
    const newsResponse: NewsResponse = await response.json()
    res.status(200).json(newsResponse.articles)
  } catch (error) {
    alert(error)
  }


  res.status(200).json({ name: 'John Doe' })
}