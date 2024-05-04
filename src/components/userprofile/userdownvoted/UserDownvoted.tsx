import { useEffect, useState } from "react";
import Line from "../../../utils/Line";
import UserDownvotedList from "./UserDownvotedList";
import ScrollTop from "../../ScrollTop";
import SortOptions from "../../general/SortOptions";

interface Props {
  setActive: (value: string) => void;
}

export default function UserDownvoted({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("NEW");

  useEffect(() => {
    setActive("disliked");
  }, []);

  return (
    <>
      <SortOptions
        sortOption={sortOption}
        setSortOption={setSortOption}
        queryKey={`user-downvoted`}
      />
      <Line />
      <UserDownvotedList sortOption={sortOption} />
      <ScrollTop />
    </>
  );
}
