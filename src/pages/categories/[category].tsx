import NewsArticlesGrid from "@/components/NewsArticlesGrid"
import { NewsArticle, NewsResponses } from "@/models/NewsArticles"
import { RedditCategory } from "@/models/RedditPosts"
import axios, { AxiosResponse } from "axios"
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
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=ca&category=${category}&apiKey=${process.env.NEWS_API_KEY}`)
  const newsResponse: NewsResponses = await response.json()
  return {
    props: {
      newsArticles: newsResponse.articles,
    },
    revalidate: 5*60,
  }
}

// export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({ params }) => {  
//   try {
//     const response: AxiosResponse<RedditCategory[]> = await axios.get("https://www.reddit.com/subreddits/popular.json");
  
//     const categories = await response.data.children.map(category => category.data.display_name); 
//     console.log(categories);
  
//     return {
//       props: {
//         newsArticles: categories
//       },
//       revalidate: 5 * 60
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         newsArticles: []
//       }
//     };
//   }
// }

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