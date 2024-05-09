import {
  Avatar,
  Combobox,
  Flex,
  Input,
  InputBase,
  useCombobox,
} from "@mantine/core";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import ComboboxDropdown from "./ComboboxDropdown";

interface CommunityComboboxProps {
  community_name?: string;
  community_avatar?: string;
  setCommunity: (community: string) => void;
  formDisabled?: boolean;
}

export default function CommunityCombobox({
  community_name,
  community_avatar,
  setCommunity,
}: CommunityComboboxProps) {
  const isSmall = useWindowSize().screenWidth < 768;

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
          size={isSmall ? "md" : "lg"}
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
          w={{ base: "auto", xs: "300px" }}
          bg={"dark"}
          className="overflow-hidden border border-[#424242] rounded-[4px] pl-4"
        >
          <div className="font-bold">
            {community_name ? (
              <Flex gap="xs" className="overflow-hidden items-center">
                <Avatar
                  src={community_avatar}
                  size={isSmall ? 24 : 28}
                  miw={isSmall ? 24 : 28}
                />
                <span className="truncate">{community_name}</span>
              </Flex>
            ) : (
              <Input.Placeholder>Choose a community</Input.Placeholder>
            )}
          </div>
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{<ComboboxDropdown />}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
