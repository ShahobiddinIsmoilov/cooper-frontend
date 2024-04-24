import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useLayoutEffect } from "react";
import PostFeed from "../components/post/PostFeed";
import ScrollTop from "../components/ScrollTop";

export default function HomePage() {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!path.includes("home")) navigate("/home");
  });

  const user = useAuthContext().user;
  return (
    <>
      {user ? <PostFeed filter="home" /> : <PostFeed filter="all" />}
      <ScrollTop />
    </>
  );
}
