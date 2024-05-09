import { Select } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "../../contexts/LanguageContext";
import { sortbar } from "./lang_post";
import { useNavigate, useParams } from "react-router-dom";

interface SortbarCommunityProps {
  community?: number;
  sortOption: string;
  setSortOption: (value: string) => void;
}

export default function SortbarCommunity(props: SortbarCommunityProps) {
  const navigate = useNavigate();
  const { community_link } = useParams();
  const { language } = useLanguage();

  function handleAboutClick() {
    navigate(`/c/${community_link}/about`);
  }

  return (
    <div className="flex justify-between items-center mx-2">
      <div className="flex gap-1 xs:gap-2">
        <button className="px-4 py-[10px] text-sm xs:text-base font-bold rounded-full bg-dark-700">
          {sortbar.feed[language]}
        </button>
        <button
          onClick={handleAboutClick}
          className="px-4 py-[10px] text-sm xs:text-base font-bold rounded-full hover:bg-dark-700"
        >
          {sortbar.about[language]}
        </button>
      </div>

      <SortOptions
        sortOption={props.sortOption}
        setSortOption={props.setSortOption}
        queryKey={`posts-community-${props.community}`}
      />
    </div>
  );
}

interface Props {
  sortOption: string;
  setSortOption: (value: string) => void;
  queryKey: string;
}

function SortOptions({ sortOption, setSortOption, queryKey }: Props) {
  const query = useQueryClient();
  const { language } = useLanguage();

  const data = [
    {
      value: sortbar.hot[language][1],
      label: sortbar.hot[language][0],
    },
    {
      value: sortbar.new[language][1],
      label: sortbar.new[language][0],
    },
    {
      value: sortbar.top[language][1],
      label: sortbar.top[language][0],
    },
  ];

  return (
    <Select
      w={language === "en" ? 100 : 120}
      data={data}
      value={sortOption}
      onOptionSubmit={(value) => {
        query.removeQueries({ queryKey: [queryKey] });
        setSortOption(value);
      }}
      className="font-bold"
    />
  );
}
