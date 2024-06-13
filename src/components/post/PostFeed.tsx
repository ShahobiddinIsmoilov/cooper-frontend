import { useState } from "react";
import { Stack } from "@mantine/core";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import Sortbar from "./Sortbar";
import PostList from "./PostList";
import SortbarCommunity from "./SortbarCommunity";

interface Props {
  filter: "home" | "explore" | "all" | "community";
  community?: number;
}

export default function PostFeed({ filter, community }: Props) {
  const [sortOption, setSortOption] = useState("new");
  const isInfobarHidden = useWindowSize().screenWidth < 820;

  return (
    <Stack
      gap={0}
      className={`xs:m-2 max-w-3xl ${
        filter === "community" ? "mt-4 xs:mt-4" : "mt-2"
      }`}
    >
      {filter === "community" && isInfobarHidden ? (
        <SortbarCommunity
          sortOption={sortOption}
          community={community}
          setSortOption={setSortOption}
        />
      ) : (
        <Sortbar
          sortOption={sortOption}
          setSortOption={setSortOption}
          filter={filter}
          community={community}
        />
      )}
      <PostList filter={filter} sortOption={sortOption} community={community} />
    </Stack>
  );
}
