export interface RedditPost {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  subreddit_id: string;
  permalink: string;
  url: string;
  created_utc: number;
  score: number;
  num_comments: number;
  thumbnail: string;
  selftext: string;
  selftext_html: string;
  is_video: boolean;
  ups: number,
}

export interface RedditPostList {
  kind: string;
  data: {
    modhash: string;
    dist: number;
    children: RedditPost[];
    after?: string;
    before?: string;
  };
}

export interface RedditCategory {
  data: {
    display_name: string;
    url: string;
    subscribers: number;
  };
}

export interface RedditCategories {
  categories: RedditCategory[]
}