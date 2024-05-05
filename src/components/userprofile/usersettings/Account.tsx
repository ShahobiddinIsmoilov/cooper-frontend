import { Grid, Stack } from "@mantine/core";
import { UserDetailProps } from "../../../interfaces/userDetailProps";
import { usersettings } from "./../lang_userprofile";
import { useLanguage } from "../../../contexts/LanguageContext";
import Line from "../../../utils/Line";

interface Props {
  user: UserDetailProps;
  displayName: string;
  phone: string;
  setDisplayName: (value: string) => void;
  setPhone: (value: string) => void;
  removeSpaces: (s: string) => string;
  enableButtons: () => boolean;
}

export const span = {
  base: 12,
  xs: 6,
};

export default function AccountSettings({
  user,
  displayName,
  phone,
  setDisplayName,
  setPhone,
  removeSpaces,
  enableButtons,
}: Props) {
  function handleDisplayNameChange(value: string) {
    setDisplayName(handleSpaces(value));
    enableButtons();
  }

  function handleSpaces(s: string) {
    s = s.replace(/\s\s+/g, " ");
    return s;
  }

  function handlePhoneChange(value: string) {
    setPhone(removeSpaces(value));
    enableButtons();
  }

  const { language } = useLanguage();

  return (
    <Stack>
      <div className="mt-4 xs:mt-0">
        <p className="mb-2 text-xs font-bold tracking-widest">
          {usersettings.account.account[language]}
        </p>
        <Line />
      </div>
      <Grid>
        <Grid.Col span={span}>
          <p className="m-1">{usersettings.account.display_name[language]}:</p>
          <input
            onChange={(e) => handleDisplayNameChange(e.target.value)}
            value={displayName}
            type="text"
            maxLength={32}
            id="display_name"
            name="display_name"
            placeholder={user.username}
            className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
          />
        </Grid.Col>
        <Grid.Col span={span}>
          <div>
            <p className="m-1">
              {usersettings.account.phone_number[language]}:
            </p>
            <input
              onChange={(e) => handlePhoneChange(e.target.value)}
              value={phone}
              type="text"
              maxLength={32}
              id="phone_number"
              name="phone_number"
              placeholder="+998 (99) 999-99-99"
              className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
            />
          </div>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
