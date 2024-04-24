import { Stack } from "@mantine/core";

interface Props {
  setPassword: (username: string) => void;
}

export default function PasswordLogin({ setPassword }: Props) {
  function handleChange(e: any) {
    setPassword(e.target.value);
  }

  return (
    <Stack gap={0}>
      <input
        onChange={(e) => handleChange(e)}
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        className="outline-none py-3 px-4 text-lg border border-line rounded-xl bg-dark-850 placeholder-white placeholder-opacity-25"
      />
    </Stack>
  );
}
