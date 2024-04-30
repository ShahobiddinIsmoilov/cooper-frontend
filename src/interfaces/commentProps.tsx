export interface CommentProps {
  id: number;
  user: number;
  avatar: string;
  post_title: string;
  parent: number;
  parent_username: string;
  upvotes: number;
  downvotes: number;
  votes: number;
  created_at: string;
  updated_at: string;
  community: number;
  community_name: string;
  community_link: string;
  community_avatar: string;
  username: string;
  body: string;
  upvoted: boolean;
  downvoted: boolean;
  post_permalink: number;
  comment_permalink: string;
}
