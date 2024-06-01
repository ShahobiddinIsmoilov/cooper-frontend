import {
  Avatar,
  Combobox,
  Flex,
  Input,
  InputBase,
  useCombobox,
} from "@mantine/core";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import ComboboxDropdown from "./ComboboxDropdown";

interface CommunityComboboxProps {
  communityName?: string;
  communityAvatar?: string;
  setCommunityId: (value: number) => void;
  setCommunityAvatar: (value: string) => void;
  setCommunityName: (value: string) => void;
  formDisabled?: boolean;
}

export default function CommunityCombobox({
  communityName,
  communityAvatar,
  setCommunityId,
  setCommunityAvatar,
  setCommunityName,
  formDisabled,
}: CommunityComboboxProps) {
  const isSmall = useWindowSize().screenWidth < 768;
  const { language } = useLanguage();

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
      disabled={formDisabled}
      radius={12}
      store={combobox}
      resetSelectionOnOptionHover
      onOptionSubmit={(value) => {
        const separated = value.split("@@@");
        setCommunityId(Number(separated[0]));
        setCommunityAvatar(separated[1]);
        setCommunityName(separated[2]);
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
          w={{ base: "auto", xs: "350px" }}
          bg={"dark"}
          className="overflow-hidden border border-[#424242] rounded-[4px] pl-4"
        >
          <div className="font-bold">
            {communityName ? (
              <Flex gap="xs" className="overflow-hidden items-center">
                <Avatar
                  src={communityAvatar}
                  size={isSmall ? 24 : 28}
                  miw={isSmall ? 24 : 28}
                />
                <span className="truncate">{communityName}</span>
              </Flex>
            ) : (
              <Input.Placeholder>{placeholder[language]}</Input.Placeholder>
            )}
          </div>
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options
          mah={400}
          style={{
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#595959 rgba(0, 0, 0, 0)",
          }}
        >
          <ComboboxDropdown />
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

const placeholder = {
  uz: "Hamjamiyat tanlang",
  en: "Choose a community",
  ru: "Choose a community",
};
