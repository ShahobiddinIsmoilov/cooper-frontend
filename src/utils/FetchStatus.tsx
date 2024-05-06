import { ImSpinner4 } from "react-icons/im";
import { lang_misc } from "../lang_misc";
import { useLanguage } from "../contexts/LanguageContext";

interface FetchStatusProps {
  size?: string;
  mt?: string;
}

export function FetchLoading({ size, mt }: FetchStatusProps) {
  return (
    <div className={`flex justify-center mt-${mt} text-${size} text-white/75`}>
      <ImSpinner4 size={20} className="animate-spin" />
    </div>
  );
}

export function FetchError({ size, mt }: FetchStatusProps) {
  const { language } = useLanguage();

  return (
    <div className={`flex justify-center mt-${mt} text-${size} text-white/50`}>
      {lang_misc.fetching_error[language]}
    </div>
  );
}
