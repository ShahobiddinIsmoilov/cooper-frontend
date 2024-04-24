import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Group, Select } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import Line from "../../../utils/Line";
import UserPostList from "./UserPostList";
import ScrollTop from "../../ScrollTop";

interface Props {
  setActive: (value: string) => void;
}

export default function UserPosts({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("NEW");
  const query = useQueryClient();
  let { username } = useParams();
  if (!username) username = useAuthContext().user?.username;

  useEffect(() => {
    setActive("posts");
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
            query.removeQueries({ queryKey: [`userposts-${username}`] });
            setSortOption(value);
          }}
        />
      </Group>
      <Line />
      <UserPostList sortOption={sortOption} />
      <ScrollTop />
    </>
  );
}
