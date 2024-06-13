import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import PostFeed from "../components/post/PostFeed";
import ScrollTop from "../components/ScrollTop";

export default function AllPage() {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!path.includes("all")) navigate("/all");
  });

  return (
    <>
      <PostFeed filter="all" />
      <ScrollTop />
    </>
  );
}
