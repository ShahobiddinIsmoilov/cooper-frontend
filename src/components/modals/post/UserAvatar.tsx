import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../services/makeRequest";
import { useAuthContext } from "../../../contexts/AuthContext";
import { UserDetailProps } from "../../../interfaces/userDetailProps";
import { Avatar } from "@mantine/core";

export default function UserAvatar() {
  const username = useAuthContext().user?.username;

  const { isPending, error, data } = useQuery({
    queryKey: ["user-profile-picture"],
    queryFn: () => makeRequest(`/api/user/detail/${username}`),
  });

  if (isPending) return <Avatar size={48} maw={48} />;

  if (error) return <Avatar size={48} maw={48} />;

  const userdetails: UserDetailProps = data.data;

  return <Avatar src={userdetails.avatar} size={48} maw={48} />;
}
