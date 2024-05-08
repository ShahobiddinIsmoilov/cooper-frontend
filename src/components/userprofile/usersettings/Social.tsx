import Line from "../../../utils/Line";
import { UserDetailProps } from "../../../interfaces/userDetailProps";
import { Grid, Stack } from "@mantine/core";
import { span } from "./Account";
import { usersettings } from "./../lang_userprofile";
import { useLanguage } from "../../../contexts/LanguageContext";

interface Props {
  user: UserDetailProps;
  telegram: string;
  instagram: string;
  facebook: string;
  twitter: string;
  setTelegram: (value: string) => void;
  setInstagram: (value: string) => void;
  setFacebook: (value: string) => void;
  setTwitter: (value: string) => void;
  removeSpaces: (s: string) => string;
}

export default function Social({
  user,
  telegram,
  instagram,
  facebook,
  twitter,
  setTelegram,
  setInstagram,
  setFacebook,
  setTwitter,
  removeSpaces,
}: Props) {
  function handleTelegramChange(value: string) {
    setTelegram(removeSpaces(value));
  }

  function handleInstagramChange(value: string) {
    setInstagram(removeSpaces(value));
  }

  function handleFacebookChange(value: string) {
    setFacebook(removeSpaces(value));
  }

  function handleTwitterChange(value: string) {
    setTwitter(removeSpaces(value));
  }

  const { language } = useLanguage();

  return (
    <Stack>
      <div>
        <p className="mb-2 text-xs font-bold tracking-widest">
          {usersettings.social.social_links[language]}
        </p>
        <Line />
      </div>
      <Grid>
        <Grid.Col span={span}>
          <p className="m-1">Telegram:</p>
          <input
            onChange={(e) => handleTelegramChange(e.target.value)}
            value={telegram}
            type="text"
            maxLength={200}
            id="telegram"
            name="telegram"
            placeholder={`https://t.me/${user.username}`}
            className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
          />
        </Grid.Col>
        <Grid.Col span={span}>
          <p className="m-1">Instagram:</p>
          <input
            onChange={(e) => handleInstagramChange(e.target.value)}
            value={instagram}
            type="text"
            maxLength={200}
            id="instagram"
            name="instagram"
            placeholder={`https://www.instagram.com/${user.username}`}
            className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
          />
        </Grid.Col>
        <Grid.Col span={span}>
          <p className="m-1">Facebook:</p>
          <input
            onChange={(e) => handleFacebookChange(e.target.value)}
            value={facebook}
            type="text"
            maxLength={200}
            id="facebook"
            name="facebook"
            placeholder={`https://www.facebook.com/${user.username}`}
            className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
          />
        </Grid.Col>
        <Grid.Col span={span}>
          <p className="m-1">Twitter / X:</p>
          <input
            onChange={(e) => handleTwitterChange(e.target.value)}
            value={twitter}
            type="text"
            maxLength={200}
            id="twitter"
            name="twitter"
            placeholder={`https://twitter.com/${user.username}`}
            className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
