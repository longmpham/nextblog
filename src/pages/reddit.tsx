import RedditPostsGrid from "@/components/RedditPostsGrid"
import { RedditCategories, RedditCategory } from "@/models/RedditPosts"
import { RedditPost, RedditPostList } from "@/models/RedditPosts"

import Head from "next/head"
import { useState, FormEvent, useEffect } from "react"
import { Button, Form, Spinner } from "react-bootstrap"
import axios, { AxiosResponse } from "axios"
import { GetStaticProps } from "next"


interface RedditCategoriesProps {
  categories: RedditCategory[],
}

export const getStaticProps: GetStaticProps<RedditCategoriesProps> = async () => {
  try {
    const response = await axios.get('https://www.reddit.com/subreddits/popular.json');
    // const categories = response.data.data.children.map((category: { data: { display_name: any } }) => category.data.display_name);
    const categories = response.data.data.children.map((category: { data: { display_name: string, url: string, subscribers: number } }) => {
      return {
        key: category.data.display_name,
        display_name: category.data.display_name,
        url: `https://www.reddit.com${category.data.url}`,
        subscribers: category.data.subscribers,
      }
    });
    // console.log(categories)
    return {
      props: {
        categories
      },
      revalidate: 60 // revalidate every 60 seconds
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        categories: []
      }
    };
  }
};


const RedditPage = ({categories}: RedditCategoriesProps) => {

  const [redditCategory, setRedditCategory] = useState("")
  const [searchResults, setSearchResults] = useState<RedditPost[] | null>(null)
  const [searchResultsLoading, setSearchResultsLoading] = useState<boolean>(false)
  const [searchResultsError, setSearchResultsError] = useState<boolean>(false)

  async function search(query: string | undefined){
    if(query) {
      try {
        setSearchResults(prevSearchResults => null)
        setSearchResultsError(prevSearchResultsError => false)
        setSearchResultsLoading(prevSearchResultsLoading => true)

        const response = await fetch("/api/searchReddit?q="+query)
        const redditPosts: RedditPost[] = await response.json()
        
        // console.log(redditPosts)

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

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const searchQuery = formData.get("searchQuery")?.toString().trim()

    search(searchQuery)

  }

  async function handleSubredditSearch(name: string) {
    setRedditCategory(prev => name)
    search(name)
  }

  // useEffect(() => {
  //   async function fetchCategories() {
  //     try {

  //       const response = await axios.get("https://www.reddit.com/subreddits/popular.json")
  //       // const categoriesResponse = await response.json()
  //       // console.log(response.data.children)
  //       setRedditCategories(response.data.children)
  //       setRedditCategories(prevRedditCategories => [...response.data.children])
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchCategories()
  // }, [])

  return (
    <>
      <Head>
        <title key="title">Reddit Posts</title>
      </Head>
      <main>
        <h1>Reddit Page</h1>
        <Form onSubmit={ handleSearch }>
          <Form.Group className="mb-3" controlId="search-input">
            <Form.Label>Search Reddit Here</Form.Label>
            <Form.Control type="text" name="searchQuery" placeholder="anitiwork"></Form.Control>
            <Form.Text>Here are some of the top subreddits...</Form.Text>
            <br></br>
            {
              categories.map((category: any, index: number) => (
                <>
                  <Button 
                    variant="outline-secondary"
                    size="sm"
                    key={category.display_name} 
                    style={{ margin:"2px", fontWeight: index % 2 === 0 ? 'bold' : 'normal' }} 
                    onClick={() => handleSubredditSearch(category.display_name)}>
                      {category.display_name} 
                  </Button>
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
      </main>
    </>
  )
}

export default RedditPage