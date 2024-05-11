import { Stack } from "@mantine/core";
import { auth } from "../lang_modals";
import { useLanguage } from "../../../contexts/LanguageContext";

interface Props {
  setUsername: (username: string) => void;
}

export default function UsernameLogin({ setUsername }: Props) {
  const { language } = useLanguage();

  function handleChange(e: any) {
    setUsername(e.target.value);
  }

  return (
    <Stack gap={0}>
      <input
        onChange={(e) => handleChange(e)}
        // data-autofocus
        type="text"
        maxLength={32}
        id="username"
        name="username"
        placeholder={auth.username[language]}
        className="py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
      />
    </Stack>
  );
}
