import { useEffect, useState } from "react";
import Line from "../../../utils/Line";
import UserUpvotedList from "./UserUpvotedList";
import ScrollTop from "../../ScrollTop";
import SortOptions from "../../general/SortOptions";

interface Props {
  setActive: (value: string) => void;
}

export default function UserUpvoted({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("new");

  useEffect(() => {
    setActive("liked");
  }, []);

  return (
    <>
      <SortOptions
        sortOption={sortOption}
        setSortOption={setSortOption}
        queryKey={`user-upvoted`}
      />
      <Line />
      <UserUpvotedList sortOption={sortOption} />
      <ScrollTop />
    </>
  );
}
