export interface NotifProps {
  id: number;
  type: string;
  post_permalink: string;
  parent_permalink: string;
  sender: number;
  community_name: string;
  community_link: string;
  created_at: string;
  is_read: boolean;
  receiver: number;
  comment: string;
  comment_deleted: boolean;
  sender_avatar: string;
  sender_deleted: boolean;
}
