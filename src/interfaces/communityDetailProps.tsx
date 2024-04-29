export interface CommunityDetailProps {
  id: number;
  name: string;
  link: string;
  owner: number;
  owner_username: string;
  description: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  rules: string;
  members: number;
  posts: number;
  comments: number;
  avatar: string;
  banner: string;
  is_joined: boolean;
}
