import { Group, Select } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";

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

  return (
    <Group className="pb-2 xs:pb-3 text-sm mx-4">
      <span>SORT BY:</span>
      <Select
        w={100}
        data={["NEW", "TOP", "BEST"]}
        value={sortOption}
        onOptionSubmit={(value) => {
          query.removeQueries({ queryKey: [queryKey] });
          setSortOption(value);
        }}
      />
    </Group>
  );
}
