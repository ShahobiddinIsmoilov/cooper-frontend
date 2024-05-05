import { ImSpinner4 } from "react-icons/im";
import { lang_misc } from "../lang_misc";
import { useLanguage } from "../contexts/LanguageContext";

export function FetchLoading() {
  return (
    <div className="flex justify-center mt-8 text-white/50">
      <ImSpinner4 size={20} className="animate-spin" />
    </div>
  );
}

export function FetchError() {
  const { language } = useLanguage();

  return (
    <div className="flex justify-center mt-8 text-white/50">
      {lang_misc.fetching_error[language]}
    </div>
  );
}
