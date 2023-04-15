import { RedditPost } from "@/models/RedditPosts"
import { Card } from "react-bootstrap"
import moment from "moment"


interface RedditPostEntryProps {
  post: RedditPost
}


const RedditPostsEntry = ({ post: { title, ups, url, selftext, author, created_utc } }: RedditPostEntryProps) => {

  const validImageUrl = "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800"

  const formattedDate = moment(created_utc * 1000).fromNow();
  
  return (
    <>
      <a href={url}>
        <Card className="h-100">
          <Card.Img 
            variant="top"
            src={validImageUrl}
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{author}</Card.Subtitle>
            <Card.Text>{selftext}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">Ups: {ups} Time: {formattedDate}</Card.Footer>
        </Card>
      </a>
    </>
  )
}

export default RedditPostsEntry