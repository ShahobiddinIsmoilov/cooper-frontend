import { Stack } from "@mantine/core";
import { ReactNode, useState } from "react";
import { FaFire } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRocket } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";
import { sortbar } from "./lang_post";
import { useLanguage } from "../../contexts/LanguageContext";
import PostList from "./PostList";

interface Props {
  filter: "home" | "explore" | "all" | "community";
  community?: number;
}

export default function PostFeed({ filter, community }: Props) {
  const [sortOption, setSortOption] = useState("hot");

  return (
    <Stack
      gap={0}
      className={`xs:m-2 max-w-3xl ${
        filter === "community" ? "mt-4 xs:mt-4" : "mt-2"
      }`}
    >
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
  const { language } = useLanguage();

  return (
    <div className="flex justify-center font-bold gap-2 text-sm xs:text-base">
      <SortbarItem
        icon={<FaFire />}
        text={sortbar.hot[language][0]}
        value="hot"
        queryKey={
          community ? `posts-community-${community}` : `posts-${filter}`
        }
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <SortbarItem
        icon={<FaRegClock />}
        text={sortbar.new[language][0]}
        value="new"
        queryKey={
          community ? `posts-community-${community}` : `posts-${filter}`
        }
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <SortbarItem
        icon={<FaRocket />}
        text={sortbar.top[language][0]}
        value="top"
        queryKey={
          community ? `posts-community-${community}` : `posts-${filter}`
        }
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </div>
  );
}

interface SortbarItemProps {
  icon: ReactNode;
  text: string;
  value: string;
  queryKey: string;
  sortOption: string;
  setSortOption: (value: string) => void;
}

function SortbarItem(props: SortbarItemProps) {
  const query = useQueryClient();

  return (
    <button
      onClick={() => {
        query.removeQueries({
          queryKey: [props.queryKey],
        });
        props.setSortOption(props.value);
      }}
      className={`py-2 px-4 rounded-full hover:bg-dark-700 ${
        props.sortOption === props.value && "bg-dark-700 text-orange-400"
      }`}
    >
      <div className="flex items-center gap-2">
        {props.icon}
        {props.text}
      </div>
    </button>
  );
}
