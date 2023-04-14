import { NewsArticle } from "@/models/NewsArticles"


interface CategoryNewsPageProps {
  newsArticles: NewsArticle[],
}

const category = ({ newsArticles } : CategoryNewsPageProps) => {

  return (
    <>
      <h1>Category Page</h1>
    </>
  )
}

export default category