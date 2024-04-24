import { Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../services/makeRequest";
import ProfileMenu from "./ProfileMenu";
import Notifications from "./notifications/Notifications";
import CreatePost from "../modals/post/CreatePost";

export default function Dashboard({ username }: { username: string }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => makeRequest(`/api/user/detail/${username}`),
  });

  if (isPending) return null;

  if (error) return null;

  const user = data.data;

  return (
    <Flex align="center" gap={8}>
      <CreatePost />
      <Notifications count={user.notifications} />
      <ProfileMenu user={user} />
    </Flex>
  );
}
