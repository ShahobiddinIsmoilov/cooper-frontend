import { useEffect, useState } from "react";
import Line from "../../../utils/Line";
import UserSavedList from "./UserSavedList";
import ScrollTop from "../../ScrollTop";
import SortOptions from "../../general/SortOptions";

interface Props {
  setActive: (value: string) => void;
}

export default function UserSaved({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("NEW");

  useEffect(() => {
    setActive("saved");
  }, []);

  return (
    <>
      <SortOptions
        sortOption={sortOption}
        setSortOption={setSortOption}
        queryKey={`user-saved`}
      />
      <Line />
      <UserSavedList sortOption={sortOption} />
      <ScrollTop />
    </>
  );
}
