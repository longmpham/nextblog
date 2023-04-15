import NewsArticlesGrid from "@/components/NewsArticlesGrid"
import { NewsArticle, NewsResponses } from "@/models/NewsArticles"
import { GetStaticPaths, GetStaticProps } from "next"


interface CategoryNewsPageProps {
  newsArticles: NewsArticle[],
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = [
    "business",
    "entertainment",
    "general",
    "health",
    "sports",
    "science",
  ]

  const paths = categorySlugs.map(slugs => ({ params: { category: slugs } }))

  return {
    paths,
    fallback: false,
  }

}


// params is deconstructing context which is what next uses in place of the file so it knows where to look for.
export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({ params }) => {  
  const category = params?.category?.toString()
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=ca&category=${category}apiKey=${process.env.NEWS_API_KEY}`)
  const newsResponse: NewsResponse = await response.json()
  return {
    props: {
      newsArticles: newsResponse.articles,
      revalidate: 5*60,
    }
  }
}

const category = ({ newsArticles } : CategoryNewsPageProps) => {

  return (
    <>
      <main>
        <h1>Category Page</h1>
        <NewsArticlesGrid articles={newsArticles}></NewsArticlesGrid>
      </main>
    </>
  )
}

export default category