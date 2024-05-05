import { useLanguage } from "../../../contexts/LanguageContext";
import { usernavbar } from "./../lang_userprofile";

interface Props {
  value: "activity" | "posts" | "comments" | "saved" | "liked" | "disliked";
  active: string;
}

export default function UserNavbarItem({ value, active }: Props) {
  const { language } = useLanguage();
  const itemText = usernavbar[value][language];

  return (
    <span
      className={`xs:text-lg py-2 px-4 rounded-full hover:bg-dark-700 ${
        active === value && "bg-dark-700 text-white"
      }`}
    >
      {itemText}
    </span>
  );
}
