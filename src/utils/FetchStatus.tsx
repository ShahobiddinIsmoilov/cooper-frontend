import { ImSpinner4 } from "react-icons/im";
import { lang_misc } from "../lang_misc";
import { useLanguage } from "../contexts/LanguageContext";

interface FetchStatusProps {
  size?: number;
  mt?: number;
}

export function FetchLoading({ mt, size }: FetchStatusProps) {
  return (
    <div className={`flex justify-center mt-${mt} text-white/75 max-w-3xl`}>
      <ImSpinner4 size={size} className="animate-spin" />
    </div>
  );
}

export function FetchError({ mt }: FetchStatusProps) {
  const { language } = useLanguage();

  return (
    <div className={`flex justify-center mt-${mt} text-white/50 max-w-3xl`}>
      {lang_misc.fetching_error[language]}
    </div>
  );
}
