import { useAuthContext } from "../contexts/AuthContext";
import PostFeed from "../components/post/PostFeed";
import ScrollTop from "../components/ScrollTop";

export default function ExplorePage() {
  const user = useAuthContext().user;

  return (
    <>
      {user ? <PostFeed filter="explore" /> : <PostFeed filter="all" />}
      <ScrollTop />
    </>
  );
}
