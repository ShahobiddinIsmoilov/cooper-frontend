import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Group, Select } from "@mantine/core";
import Line from "../../../utils/Line";
import UserSavedList from "./UserSavedList";
import ScrollTop from "../../ScrollTop";

interface Props {
  setActive: (value: string) => void;
}

export default function UserSaved({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("NEW");
  const query = useQueryClient();

  useEffect(() => {
    setActive("saved");
  }, []);

  return (
    <>
      <Group className="pb-3">
        <span>SORT BY:</span>
        <Select
          w={100}
          data={["NEW", "TOP", "BEST"]}
          value={sortOption}
          onOptionSubmit={(value) => {
            query.removeQueries({ queryKey: ["user-saved"] });
            setSortOption(value);
          }}
        />
      </Group>
      <Line />
      <UserSavedList sortOption={sortOption} />
      <ScrollTop />
    </>
  );
}
