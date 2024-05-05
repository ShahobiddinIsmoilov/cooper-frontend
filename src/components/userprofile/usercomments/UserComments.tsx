import { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import Line from "../../../utils/Line";
import UserCommentList from "./UserCommentList";
import ScrollTop from "../../ScrollTop";
import SortOptions from "../../general/SortOptions";

interface Props {
  setActive: (value: string) => void;
}

export default function UserComments({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("new");
  let { username } = useParams();
  if (!username) username = useAuthContext().user?.username;

  useEffect(() => {
    setActive("comments");
  }, []);

  return (
    <>
      <SortOptions
        sortOption={sortOption}
        setSortOption={setSortOption}
        queryKey={`usercomments-${username}`}
      />
      <Line />
      <UserCommentList sortOption={sortOption} />
      <ScrollTop />
    </>
  );
}
