import NewsArticlesGrid from '@/components/NewsArticlesGrid'
import { NewsArticle } from '@/models/NewsArticles'
import { FormEvent, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'


const SearchPage = () => {

  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null)
  // const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResultsLoading, setSearchResultsLoading] = useState<boolean>(false)
  const [searchResultsError, setSearchResultsError] = useState<boolean>(false)


  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const searchQuery = formData.get("searchQuery")?.toString().trim()

    if (searchQuery) {
      try {
        setSearchResults(prevSearchResults => null)
        setSearchResultsError(prev => false)
        setSearchResultsLoading(prev => true)
        const response = await fetch("/api/search?q="+searchQuery)
        const articles: NewsArticle[] = await response.json()
        setSearchResults(prevSearchResults => [...articles])
      } catch (error) {
        console.error(error)
        setSearchResultsError(prev => true)
      }
      finally {
        setSearchResultsLoading(prev => false)
      }
    }
  }


  return(
    <>
      <h1>Search Page</h1>
      <Form onSubmit={ handleSearch }>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search your news here</Form.Label>
          <Form.Control type="text" name="searchQuery" placeholder="artificial intelligence"></Form.Control>
          <Form.Text>Finally your news sources in one place with no ads...</Form.Text>
        </Form.Group>
        <Button variant="primary" disabled={searchResultsLoading} type="submit">Search</Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
        { searchResultsLoading && <Spinner animation="border"></Spinner> }
        { searchResultsError && <p>Something Went Wrong...</p> }
        { searchResults?.length === 0 && <p>Nothing Found!</p>}
        { searchResults && <NewsArticlesGrid articles={searchResults}></NewsArticlesGrid> }
      </div>
    </>
  )
}

export default SearchPage