import RedditPostsGrid from "@/components/RedditPostsGrid"
import { RedditCategories, RedditCategory } from "@/models/RedditPosts"
import { RedditPost, RedditPostList } from "@/models/RedditPosts"

import Head from "next/head"
import { useState, FormEvent, useEffect } from "react"
import { Button, Form, Spinner } from "react-bootstrap"

const RedditPage = () => {

  const [redditCategories, setRedditCategories] = useState([{}])
  const [searchResults, setSearchResults] = useState<RedditPost[] | null>(null)
  const [searchResultsLoading, setSearchResultsLoading] = useState<boolean>(false)
  const [searchResultsError, setSearchResultsError] = useState<boolean>(false)


  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const searchQuery = formData.get("searchQuery")?.toString().trim()

    if(searchQuery) {
      try {
        setSearchResults(prevSearchResults => null)
        setSearchResultsError(prevSearchResultsError => false)
        setSearchResultsLoading(prevSearchResultsLoading => true)

        const response = await fetch("/api/searchReddit?q="+searchQuery)
        const redditPosts: RedditPost[] = await response.json()
        
        console.log(redditPosts)

        setSearchResults(prevSerachResults => [...redditPosts]) 

      } catch (error) {
        console.error(error)
        setSearchResultsError(prevSearchResultsError => true)
      }
      finally {
        setSearchResultsLoading(prevSearchResultsLoading => false)
      }
    }

  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("https://www.reddit.com/subreddits/popular.json")
        const categoriesResponse = await response.json()
        console.log(categoriesResponse.data.children)
        // setRedditCategories(categoriesResponse.data.children)
        setRedditCategories(prevRedditCategories => [...categoriesResponse.data.children])
      } catch (error) {
        console.error(error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <>
      <Head>
        <title key="title">Reddit Posts</title>
      </Head>
      <h1>Reddit Page</h1>
      <Form onSubmit={ handleSearch }>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search Reddit Here</Form.Label>
          <Form.Control type="text" name="searchQuery" placeholder="AITA"></Form.Control>
          <Form.Text>Here are some of the top subreddits...</Form.Text>
          <br></br>
          {
            redditCategories.map((category: any, index: number) => (
              <>
                <Form.Text key={category.data.title} style={{ fontWeight: index % 2 === 0 ? 'bold' : 'normal' }}>{category.data.display_name} </Form.Text>
                <Form.Text> | </Form.Text>
              </>
            ))
          }
        </Form.Group>
        <Button variant="primary" disabled={searchResultsLoading} type="submit">Search</Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
          { searchResultsLoading && <Spinner animation="border"></Spinner> }
          { searchResultsError && <p>Something Went Wrong...</p> }
          { searchResults?.length === 0 && <p>Nothing Found!</p>}
          { searchResults && <RedditPostsGrid posts={searchResults}></RedditPostsGrid> }
        </div>
    </>
  )
}

export default RedditPage