import { FaPlus } from "react-icons/fa6";

export default function CreatePostButton() {
  return (
    <button className="p-[10px] flex items-center gap-1 hover:bg-dark-700 border-white border-opacity-25 rounded-full">
      <FaPlus size={20} />
      Create
    </button>
  );
}
