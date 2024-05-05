import { Group, Select } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "../../contexts/LanguageContext";
import { lang_sort } from "./lang_general";

interface Props {
  sortOption: string;
  setSortOption: (value: string) => void;
  queryKey: string;
}

export default function SortOptions({
  sortOption,
  setSortOption,
  queryKey,
}: Props) {
  const query = useQueryClient();
  const { language } = useLanguage();

  const data = [
    {
      value: lang_sort.sort_options.new[language][1],
      label: lang_sort.sort_options.new[language][0],
    },
    {
      value: lang_sort.sort_options.top[language][1],
      label: lang_sort.sort_options.top[language][0],
    },
    {
      value: lang_sort.sort_options.best[language][1],
      label: lang_sort.sort_options.best[language][0],
    },
  ];

  return (
    <Group className="pb-2 xs:pb-3 text-sm mx-4">
      <span>{lang_sort.sort_by[language]}:</span>
      <Select
        w={language === "en" ? 100 : 200}
        data={data}
        value={sortOption}
        onOptionSubmit={(value) => {
          query.removeQueries({ queryKey: [queryKey] });
          setSortOption(value);
        }}
      />
    </Group>
  );
}
