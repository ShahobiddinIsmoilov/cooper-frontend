import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import UserActivityList from "./UserActivityList";
import Line from "../../../utils/Line";
import ScrollTop from "../../ScrollTop";
import SortOptions from "../../general/SortOptions";

interface Props {
  setActive: (value: string) => void;
}

export default function UserActivity({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("new");
  let { username } = useParams();
  if (!username) username = useAuthContext().user?.username;

  useEffect(() => {
    setActive("activity");
  }, []);

  return (
    <>
      <SortOptions
        sortOption={sortOption}
        setSortOption={setSortOption}
        queryKey={`useractivity-${username}`}
      />
      <Line />
      <UserActivityList sortOption={sortOption} />
      <ScrollTop />
    </>
  );
}
