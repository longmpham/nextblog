// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RedditPostList } from '@/models/RedditPosts'
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
    const response = await fetch(`https://www.reddit.com/r/${searchQuery}/top/.json?t=day`)
    const redditResponse: RedditPostList = await response.json()
    // const paragraph = redditResponse.data.children.map(child => child.data.selftext.toString())
    // const sentences = paragraph[0].split('.').map((sentence: string) => sentence.trim());
    // console.log(sentences);

    // console.log(redditResponse.data.children)
    res.status(200).json(redditResponse.data.children)
  } catch (error) {
    res.status(404).json({ msg: "there seems to be something wrong..."})
  }
}
