import { Stack } from "@mantine/core";
import { TbMapPinQuestion } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function LostPage() {
  const navigate = useNavigate();

  return (
    <div className="mt-24 flex justify-center items-center text-2xl gap-y-4">
      <Stack align="center">
        <TbMapPinQuestion size={75} opacity={0.8} />
        <p>Looks like you're lost. Let's take you home.</p>
        <button
          onClick={() => navigate("/all")}
          className="font-bold text-xl px-4 py-2 rounded-xl w-fit bg-cyan-700 hover:bg-cyan-600"
        >
          Go Home
        </button>
      </Stack>
    </div>
  );
}
