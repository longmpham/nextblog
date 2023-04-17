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

  const paths = categorySlugs.map(slug => ({ params: { category: slug } }))

  return {
    paths,
    fallback: false,
  }

}


// params is deconstructing context which is what next uses in place of the file so it knows where to look for.
export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({ params }) => {  
  const category = params?.category?.toString()
  const url = `https://newsapi.org/v2/top-headlines?country=ca&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
  console.log(url)
  const response = await fetch(url)
  const newsResponse: NewsResponses = await response.json()
  console.log(newsResponse)
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