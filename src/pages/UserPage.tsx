import { Stack } from "@mantine/core";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../services/makeRequest";
import { UserDetailProps } from "../interfaces/userDetailProps";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import UserActivity from "../components/userprofile/useractivity/UserActivity";
import UserPosts from "../components/userprofile/userposts/UserPosts";
import UserComments from "../components/userprofile/usercomments/UserComments";
import Line from "../utils/Line";
import UserNavbar from "../components/userprofile/usernavbar/UserNavbar";
import UserProfile from "../components/userprofile/userinfo/UserProfile";

export default function UserPage() {
  const username = useParams().username;
  const user = useAuthContext().user;
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const pattern_posts = /^\/user\/[^\/]+\/posts$/;
  const pattern_comments = /^\/user\/[^\/]+\/comments$/;
  const pattern_saved = /^\/user\/[^\/]+\/saved$/;
  const pattern_liked = /^\/user\/[^\/]+\/liked$/;
  const pattern_disliked = /^\/user\/[^\/]+\/disliked$/;

  useEffect(() => {
    if (username === user?.username) {
      if (pattern_posts.test(path)) navigate("/profile/posts");
      else if (pattern_comments.test(path)) navigate("/profile/comments");
      else if (pattern_saved.test(path)) navigate("/profile/saved");
      else if (pattern_liked.test(path)) navigate("/profile/liked");
      else if (pattern_disliked.test(path)) navigate("/profile/disliked");
      else navigate("/profile");
    } else if (
      pattern_saved.test(path) ||
      pattern_liked.test(path) ||
      pattern_disliked.test(path)
    )
      navigate(`/user/${username}`);
  }, []);

  const [active, setActive] = useState("activity");

  const { isPending, error, data } = useQuery({
    queryKey: [`userpage-${username}`],
    queryFn: () => makeRequest(`/api/user/detail/${username}`),
  });

  if (isPending) return "Loading...";

  if (error) return "Error";

  const userdetail: UserDetailProps = data.data;

  return (
    <Stack gap={8} className="xs:mx-4">
      <UserProfile user={userdetail} />
      <UserNavbar active={active} />
      <Line />
      <div className="flex justify-center">
        <div className="xs:p-1 flex-grow max-w-3xl">
          <Routes>
            <Route path="" element={<UserActivity setActive={setActive} />} />
            <Route
              path="/posts"
              element={<UserPosts setActive={setActive} />}
            />
            <Route
              path="/comments"
              element={<UserComments setActive={setActive} />}
            />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </div>
      </div>
    </Stack>
  );
}
