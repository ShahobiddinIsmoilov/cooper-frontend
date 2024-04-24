export interface CommentProps {
  id: number;
  user: number;
  post: number;
  post_title: string;
  parent: number;
  parent_user: number;
  parent_username: string;
  upvotes: number;
  downvotes: number;
  votes: number;
  created_at: string;
  updated_at: string;
  community: number;
  community_name: string;
  community_link: string;
  username: string;
  body: string;
  upvoted: boolean;
  downvoted: boolean;
  comment_permalink: string;
  post_permalink: string;
}
