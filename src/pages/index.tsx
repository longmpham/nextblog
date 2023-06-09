import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { NewsArticle, NewsResponses } from '@/models/NewsArticles'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticlesGrid from '@/components/NewsArticlesGrid'

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[],
}
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=ca&apiKey=" + process.env.NEWS_API_KEY)
  const newsResponse: NewsResponses = await response.json()
  return {
    props: {newsArticles: newsResponse.articles }
  }
}


export default function BreakingNewsPage({newsArticles} : BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">BreakingNewsPage</title>
      </Head>
      <main>
        <h1>BreakingNewsPage</h1>
        <NewsArticlesGrid articles={newsArticles}></NewsArticlesGrid>
      </main>
    </>
  )
}
