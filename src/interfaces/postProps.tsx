export interface PostProps {
  id: number;
  username: string;
  user_avatar: string;
  community_avatar: string;
  community_name: string;
  community_link: string;
  type: string;
  image: string;
  link: string;
  title: string;
  body: string;
  created_at: string;
  visits: number;
  upvotes: number;
  downvotes: number;
  comments: number;
  votes: number;
  ratio: number;
  score: number;
  user: number;
  community: number;
  upvoted: boolean;
  downvoted: boolean;
  saved: boolean;
  hidden: boolean;
  permalink: string;
}
