export interface CommentProps {
  id: number;
  user: number;
  avatar: string;
  post_title: string;
  parent: number;
  parent_username: string;
  parent_deleted: boolean;
  parent_user_deleted: boolean;
  upvotes: number;
  downvotes: number;
  votes: number;
  created_at: string;
  edited: boolean;
  edited_at: string;
  community: number;
  community_name: string;
  community_link: string;
  community_avatar: string;
  username: string;
  body: string;
  upvoted: boolean;
  downvoted: boolean;
  post_permalink: number;
  post_deleted: boolean;
  comment_permalink: string;
  deleted: boolean;
}
