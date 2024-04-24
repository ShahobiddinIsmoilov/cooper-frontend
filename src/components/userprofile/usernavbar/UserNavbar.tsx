import { Group } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import UserNavbarItem from "./UserNavbarItem";

export default function UserNavbar({ active }: { active: string }) {
  const { username } = useParams();

  return (
    <Group justify="center" pb={8}>
      <Link to={`/user/${username}`}>
        <UserNavbarItem username={username} value="Activity" active={active} />
      </Link>
      <Link to={`/user/${username}/posts`}>
        <UserNavbarItem username={username} value="Posts" active={active} />
      </Link>
      <Link to={`/user/${username}/comments`}>
        <UserNavbarItem username={username} value="Comments" active={active} />
      </Link>
    </Group>
  );
}
