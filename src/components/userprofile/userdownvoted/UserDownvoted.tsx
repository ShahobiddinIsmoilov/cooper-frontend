import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Group, Select } from "@mantine/core";
import Line from "../../../utils/Line";
import UserDownvotedList from "./UserDownvotedList";
import ScrollTop from "../../ScrollTop";

interface Props {
  setActive: (value: string) => void;
}

export default function UserDownvoted({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("NEW");
  const query = useQueryClient();

  useEffect(() => {
    setActive("disliked");
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
            query.removeQueries({ queryKey: ["user-downvoted"] });
            setSortOption(value);
          }}
        />
      </Group>
      <Line />
      <UserDownvotedList sortOption={sortOption} />
      <ScrollTop />
    </>
  );
}
