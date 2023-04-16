import { RedditPost } from "@/models/RedditPosts"
import { Row, Col } from "react-bootstrap"
import RedditPostsEntry from "./RedditPostEntry"


interface RedditPostsGridProps {
  posts: RedditPost[],
}


const RedditPostsGrid = ({ posts }: RedditPostsGridProps) => {

  return (
    <>
      <Row xs={1} sm={2} xl={3} className="g-4">
        {
          // I can deconstruct the data too here and just use data instead
          // posts.map(({ data },index) => (
          posts.map((post,index) => (
            <Col key={index}>
              <RedditPostsEntry post={post.data}></RedditPostsEntry>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default RedditPostsGrid