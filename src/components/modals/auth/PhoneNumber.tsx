import { Stack } from "@mantine/core";
import { useState } from "react";

export default function PhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Stack gap={0}>
      <input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        id="phone"
        name="phone"
        placeholder="Phone number"
        className="outline-none py-3 px-4 text-lg border border-line rounded-xl bg-dark-850 placeholder-white placeholder-opacity-25"
      />
      <div className="flex justify-end">
        <button className="text-blue-400 hover:text-blue-300 text-sm"></button>
      </div>
    </Stack>
  );
}
