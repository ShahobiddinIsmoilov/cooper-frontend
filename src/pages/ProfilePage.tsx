import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Stack } from "@mantine/core";
import { useAuthContext } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../services/makeRequest";
import { UserDetailProps } from "../interfaces/userDetailProps";
import { useWindowSize } from "../contexts/WindowSizeContext";
import { FetchError, FetchLoading } from "../utils/FetchStatus";
import Line from "../utils/Line";
import MyUserNavbar from "../components/userprofile/usernavbar/MyUserNavbar";
import UserActivity from "../components/userprofile/useractivity/UserActivity";
import UserPosts from "../components/userprofile/userposts/UserPosts";
import UserComments from "../components/userprofile/usercomments/UserComments";
import UserSaved from "../components/userprofile/usersaved/UserSaved";
import UserUpvoted from "../components/userprofile/userupvoted/UserUpvoted";
import UserDownvoted from "../components/userprofile/userdownvoted/UserDownvoted";
import UserProfile from "../components/userprofile/userinfo/UserProfile";

export default function ProfilePage() {
  const { screenWidth } = useWindowSize();
  const username = useAuthContext().user?.username;
  const navigate = useNavigate();
  !username && navigate("/");
  const [active, setActive] = useState("activity");

  const { isPending, error, data } = useQuery({
    queryKey: ["profile-page"],
    queryFn: () => makeRequest(`/api/user/detail/${username}`),
  });

  if (isPending) return <FetchLoading mt={8} size={24} />;

  if (error) return <FetchError mt={8} />;

  const userdetail: UserDetailProps = data.data;

  return (
    <Stack gap={8} className="xs:mx-4">
      <UserProfile user={userdetail} />
      <MyUserNavbar active={active} />
      <Line />
      <div className="flex justify-center">
        <div
          className={`flex-grow ${
            screenWidth >= 768 ? "max-w-3xl" : "w-screen"
          }`}
        >
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
            <Route
              path="/saved"
              element={<UserSaved setActive={setActive} />}
            />
            <Route
              path="/liked"
              element={<UserUpvoted setActive={setActive} />}
            />
            <Route
              path="/disliked"
              element={<UserDownvoted setActive={setActive} />}
            />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </div>
      </div>
    </Stack>
  );
}
