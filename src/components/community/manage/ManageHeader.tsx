import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Group } from "@mantine/core";

export default function ManageHeader() {
  const navigate = useNavigate();
  return (
    <Group gap={12}>
      <button
        className="p-2 rounded-full cursor-pointer bg-dark-750 hover:bg-dark-700"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={22} />
      </button>
      <p className="text-xl xs:text-2xl font-bold">Hamjamiyat sozlamalari</p>
    </Group>
  );
}
