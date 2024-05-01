import { Avatar, Combobox, Group, Space } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../services/makeRequest";
import { CommunityProps } from "../../../interfaces/communityProps";

export default function ComboboxDropdown() {
  const { isPending, error, data } = useQuery({
    queryKey: ["combobox-community-list"],
    queryFn: () => makeRequest(`/api/community/list/all`),
  });

  if (isPending) return "Loading...";

  if (error) return "Error";

  const communityList: CommunityProps[] = data.data;

  let communities = [];
  for (let i = 0; i < communityList.length; i++) {
    const item = [communityList[i]["link"], communityList[i]["avatar"]];
    communities[i] = item;
  }

  const communityOptions = communities.map((item) => (
    <Combobox.Option value={item[0]} key={item[0]}>
      <Group gap="xs">
        <Space h="xl" />
        <Avatar src={item[1]} size={28} maw={28} />
        <span className="text-lg font-bold truncate">{item[0]}</span>
      </Group>
    </Combobox.Option>
  ));
  return communityOptions;
}
