export interface NotifProps {
  id: number;
  type: string;
  parent_post: number;
  parent_comment: number;
  user: number;
  username: string;
  community_name: string;
  community_link: string;
  created_at: string;
  is_read: boolean;
  parent_user: number;
  comment: number;
  user_avatar: string;
  community_avatar: string;
  comment_body: string;
}
