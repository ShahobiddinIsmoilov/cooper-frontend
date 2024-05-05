import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import Line from "../../../utils/Line";
import UserPostList from "./UserPostList";
import ScrollTop from "../../ScrollTop";
import SortOptions from "../../general/SortOptions";

interface Props {
  setActive: (value: string) => void;
}

export default function UserPosts({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("new");
  let { username } = useParams();
  if (!username) username = useAuthContext().user?.username;

  useEffect(() => {
    setActive("posts");
  }, []);

  return (
    <>
      <SortOptions
        sortOption={sortOption}
        setSortOption={setSortOption}
        queryKey={`userposts-${username}`}
      />
      <Line />
      <UserPostList sortOption={sortOption} />
      <ScrollTop />
    </>
  );
}
