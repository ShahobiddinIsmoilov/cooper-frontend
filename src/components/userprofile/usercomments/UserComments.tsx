import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Group, Select } from "@mantine/core";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import Line from "../../../utils/Line";
import UserCommentList from "./UserCommentList";
import ScrollTop from "../../ScrollTop";

interface Props {
  setActive: (value: string) => void;
}

export default function UserComments({ setActive }: Props) {
  const [sortOption, setSortOption] = useState("NEW");
  const query = useQueryClient();
  let { username } = useParams();
  if (!username) username = useAuthContext().user?.username;

  useEffect(() => {
    setActive("comments");
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
            query.removeQueries({ queryKey: [`usercomments-${username}`] });
            setSortOption(value);
          }}
        />
      </Group>
      <Line />
      <UserCommentList sortOption={sortOption} />
      <ScrollTop />
    </>
  );
}
