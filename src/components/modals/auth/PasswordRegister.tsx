import { Stack } from "@mantine/core";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

interface Props {
  setPassword: (username: string) => void;
}

export default function PasswordRegister({ setPassword }: Props) {
  const [validationError, setValidationError] = useState(false);

  function handleChange(e: any) {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9_-]+$/;
    if (value != "" && !regex.test(value)) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
    setPassword(e.target.value);
  }

  return (
    <Stack gap={0}>
      <p className="ml-2 flex gap-1 text-lg items-center">
        Password:
        <FaQuestionCircle size={14} opacity={0.5} />
      </p>
      <input
        onChange={(e) => handleChange(e)}
        onFocus={(e) => handleChange(e)}
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        className="outline-none py-3 px-4 text-lg border border-line rounded-xl bg-dark-850 placeholder-white placeholder-opacity-25"
      />
      {validationError && (
        <p className="text-red-400 text-sm">
          Username can only include uppercase (A-Z) and lowercase (a-z) letters,
          numbers (0-9), hyphens (-) and underscores (_)
        </p>
      )}
    </Stack>
  );
}
