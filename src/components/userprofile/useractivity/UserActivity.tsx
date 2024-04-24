import { useQueryClient } from "@tanstack/react-query";
import { Group, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import UserActivityList from "./UserActivityList";
import Line from "../../../utils/Line";
import ScrollTop from "../../ScrollTop";

interface Props {
  setActive: (value: string) => void;
}

export default function UserActivity({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("NEW");
  const query = useQueryClient();
  let { username } = useParams();
  if (!username) username = useAuthContext().user?.username;

  useEffect(() => {
    setActive("activity");
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
            query.removeQueries({ queryKey: [`useractivity-${username}`] });
            setSortOption(value);
          }}
        />
      </Group>
      <Line />
      <UserActivityList sortOption={sortOption} />
      <ScrollTop />
    </>
  );
}
