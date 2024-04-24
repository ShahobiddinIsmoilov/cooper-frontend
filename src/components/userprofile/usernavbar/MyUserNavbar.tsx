import { Flex, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import UserNavbarItem from "./UserNavbarItem";

export default function UserNavbar({ active }: { active: string }) {
  return (
    <Flex justify="space-between">
      <Group pb={8} gap={8}>
        <Link to={""}>
          <UserNavbarItem value="Activity" active={active} />
        </Link>
        <Link to={`/profile/posts`}>
          <UserNavbarItem value="Posts" active={active} />
        </Link>
        <Link to={`/profile/comments`}>
          <UserNavbarItem value="Comments" active={active} />
        </Link>
        <Link to={`/profile/saved`}>
          <UserNavbarItem value="Saved" active={active} />
        </Link>
        <Link to={`/profile/liked`}>
          <UserNavbarItem value="Liked" active={active} />
        </Link>
        <Link to={`/profile/disliked`}>
          <UserNavbarItem value="Disliked" active={active} />
        </Link>
      </Group>
      <Link to="/profile/settings">
        <UserNavbarItem value="Settings" active={active} />
      </Link>
    </Flex>
  );
}
