import { Link, useParams } from "react-router-dom";
import UserNavbarItem from "./UserNavbarItem";

export default function UserNavbar({ active }: { active: string }) {
  const { username } = useParams();

  return (
    <div className="flex justify-center gap-1 xs:gap-2 mt-4 mb-2">
      <Link to={`/user/${username}`}>
        <UserNavbarItem value="activity" active={active} />
      </Link>
      <Link to={`/user/${username}/posts`}>
        <UserNavbarItem value="posts" active={active} />
      </Link>
      <Link to={`/user/${username}/comments`}>
        <UserNavbarItem value="comments" active={active} />
      </Link>
    </div>
  );
}
