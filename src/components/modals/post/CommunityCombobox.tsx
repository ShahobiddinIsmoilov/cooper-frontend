import {
  Avatar,
  Combobox,
  Flex,
  Group,
  Input,
  InputBase,
  Space,
  useCombobox,
} from "@mantine/core";

interface CommunityComboboxProps {
  community?: string;
  setCommunity: (community: string) => void;
  formDisabled?: boolean;
}

export default function CommunityCombobox({
  community,
  setCommunity,
}: CommunityComboboxProps) {
  const communities = [
    ["all", "../../../../src/Assets/avatar_all.jpg"],
    ["O'zbeklar", "../../../../src/Assets/avatar_O'zbeklar.jpg"],
    ["texnologiya", "../../../../src/Assets/avatar_texnologiya.jpg"],
    ["Mashinalar", "../../../../src/Assets/avatar_Mashinalar.jpg"],
    ["O'yinlar", "../../../../src/Assets/avatar_O'yinlar.jpg"],
  ];

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === "keyboard") {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex("active");
      }
    },
  });

  const communityOptions = communities.map((item) => (
    <Combobox.Option value={item[0]} key={item[0]}>
      <Group gap="xs">
        <Space h="xl" />
        <Avatar src={item[1]} radius={8} size={28} maw={28} />
        <span className="text-lg font-bold truncate">{item[0]}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      radius={12}
      store={combobox}
      resetSelectionOnOptionHover
      onOptionSubmit={(val) => {
        setCommunity(val);
        combobox.updateSelectedOptionIndex("active");
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target targetType="button">
        <InputBase
          variant="unstyled"
          size="lg"
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
          w="300px"
          bg={"dark"}
          className="overflow-hidden border border-[#424242] rounded-[4px] pl-4"
        >
          <div className="font-bold">
            {community ? (
              <Flex gap="xs" className="overflow-hidden items-center">
                <Avatar
                  src={`games", "../../../../src/Assets/avatar_${community}.jpg`}
                  radius={8}
                  size={28}
                  maw={28}
                />
                <span className="truncate">{community}</span>
              </Flex>
            ) : (
              <Input.Placeholder>Choose a community</Input.Placeholder>
            )}
          </div>
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{communityOptions}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
