import { Stack } from "@mantine/core";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

interface Props {
  setUsername: (username: string) => void;
}

export default function UsernameRegister({ setUsername }: Props) {
  const [validationError, setValidationError] = useState(false);

  function handleChange(e: any) {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9_-]+$/;
    if (value != "" && !regex.test(value)) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
    setUsername(e.target.value);
  }

  return (
    <Stack gap={0}>
      <p className="ml-2 flex gap-1 text-lg items-center">
        Username:
        <FaQuestionCircle size={14} opacity={0.5} />
      </p>
      <input
        onChange={(e) => handleChange(e)}
        onFocus={(e) => handleChange(e)}
        data-autofocus
        type="text"
        maxLength={32}
        id="username"
        name="username"
        placeholder="Username"
        className={`py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 ${
          validationError ? "border border-red-400" : "border border-line "
        }`}
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
