import PostFeed from "../components/post/PostFeed";
import ScrollTop from "../components/ScrollTop";

export default function AllPage() {
  return (
    <>
      <PostFeed filter="all" />
      <ScrollTop />
    </>
  );
}
