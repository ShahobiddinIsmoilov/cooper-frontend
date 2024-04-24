import { Stack } from "@mantine/core";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRocket } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";
import PostList from "./PostList";

interface Props {
  filter: "home" | "explore" | "all" | "community";
  community?: number;
}

export default function PostFeed({ filter, community }: Props) {
  const [sortOption, setSortOption] = useState("hot");

  return (
    <Stack gap={0} className="xs:p-1 max-w-3xl mt-2">
      <Sortbar
        sortOption={sortOption}
        setSortOption={setSortOption}
        filter={filter}
        community={community}
      />
      <PostList filter={filter} sortOption={sortOption} community={community} />
    </Stack>
  );
}

interface SortbarProps {
  sortOption: string;
  setSortOption: (value: string) => void;
  filter: "home" | "explore" | "all" | "community";
  community?: number;
}

function Sortbar({
  sortOption,
  setSortOption,
  filter,
  community,
}: SortbarProps) {
  const { screenWidth } = useWindowSize();
  const query = useQueryClient();

  return screenWidth < 620 ? (
    <div className="flex justify-center gap-2 text-white">
      <p className="opacity-50 px-2 flex items-center text-center">SORT BY:</p>
    </div>
  ) : (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => {
          query.removeQueries({
            queryKey: community
              ? [`posts-community-${community}`]
              : [`posts-${filter}`],
          });
          setSortOption("hot");
        }}
        className={`text-lg py-2 px-4 rounded-full hover:bg-dark-700 ${
          sortOption === "hot" && "bg-dark-700 text-orange-400"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaFire className="inline-block" />
          <span>TRENDING</span>
        </div>
      </button>
      <button
        onClick={() => {
          query.removeQueries({
            queryKey: community
              ? [`posts-community-${community}`]
              : [`posts-${filter}`],
          });
          setSortOption("new");
        }}
        className={`text-lg py-2 px-4 rounded-full hover:bg-dark-700 ${
          sortOption === "new" && "bg-dark-700 text-orange-400"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaRegClock className="inline-block" />
          <span>NEWEST</span>
        </div>
      </button>
      <button
        onClick={() => {
          query.removeQueries({
            queryKey: community
              ? [`posts-community-${community}`]
              : [`posts-${filter}`],
          });
          setSortOption("top");
        }}
        className={`text-lg py-2 px-4 rounded-full hover:bg-dark-700 ${
          sortOption === "top" && "bg-dark-700 text-orange-400"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaRocket className="inline-block" />
          <span>TOP</span>
        </div>
      </button>
    </div>
  );
}
