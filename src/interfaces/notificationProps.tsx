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
  sender_avatar: string;
}
