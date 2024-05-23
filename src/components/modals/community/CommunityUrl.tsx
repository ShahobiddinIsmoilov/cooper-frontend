import { Textarea } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { makeRequest } from "../../../services/makeRequest";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useWindowSize } from "../../../contexts/WindowSizeContext";

interface PostTitleProps {
  link: string;
  setLink: (title: string) => void;
  formDisabled: boolean;
  error: string | undefined;
  setError: (value: string | undefined) => void;
  setLinkSuccess: (value: boolean) => void;
}

export default function CommunityName({
  link,
  setLink,
  formDisabled,
  error,
  setError,
  setLinkSuccess,
}: PostTitleProps) {
  const { language } = useLanguage();
  const isSmall = useWindowSize().screenWidth < 768;

  function removeSpaces(s: string) {
    s = s.replace(/\s/g, "");
    return s;
  }

  async function checkAvailability(link: string) {
    const response = await makeRequest(`/api/community/check-link/${link}/`);
    if (response.data["status"] === "ERROR") {
      setError("This link is not available");
      setLinkSuccess(false);
    } else {
      setError(undefined);
      setLinkSuccess(true);
    }
  }

  const handleValidation = useDebouncedCallback((value: string) => {
    checkAvailability(value);
  }, 500);

  function handleChange(value: string) {
    setLinkSuccess(false);
    setError(undefined);
    const spacelessLink = removeSpaces(value);
    const latinLink = cyrillicToLatin(spacelessLink);
    const filteredLink = removeChars(latinLink);
    setLink(filteredLink);
    if (filteredLink.length > 0) {
      handleValidation(filteredLink);
    }
  }

  return (
    <div className="overflow-hidden -mt-2">
      {error ? (
        <span className={`text-red-400 text-xs sm:text-sm`}>{error}</span>
      ) : (
        <span className={`text-white/50 text-xs sm:text-sm`}>
          <i>{allowed_chars[language]}</i>
        </span>
      )}
      <Textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        readOnly={formDisabled}
        variant="unstyled"
        maxLength={24}
        bg={"dark"}
        autosize
        value={link}
        placeholder="Link"
        size={isSmall ? "md" : "lg"}
        className="flex-grow border border-line rounded-[4px] px-3 sm:px-4"
      />
      <div className="flex justify-between gap-2">
        <span className={`text-white/50 text-sm sm:text-base truncate`}>
          https://diagonal.uz/c/{link}
        </span>
        <span className={`text-white/50 text-sm sm:text-base`}>
          {link.length}/24
        </span>
      </div>
    </div>
  );
}

function cyrillicToLatin(str: string) {
  const cyrillicToLatinMap: any = {
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "Yo",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Shch",
    Ъ: " ",
    Ы: "Y",
    Ь: " ",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: " ",
    ы: "y",
    ь: " ",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  return str
    .split("")
    .map((char) => cyrillicToLatinMap[char] || char)
    .join("");
}

function removeChars(input: string) {
  const ALLOWED_CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_0123456789";
  return input
    .split("")
    .filter((char) => ALLOWED_CHARS.includes(char))
    .join("");
}

const allowed_chars = {
  uz: "Faqat lotincha harflar, raqamlar va tagchiziq ishlatish mumkin",
  en: "Only English letters, numbers and underscores are allowed",
  ru: "Only English letters, numbers and underscores are allowed",
};
