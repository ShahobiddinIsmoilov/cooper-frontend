import { useLanguage } from "../../contexts/LanguageContext";
import exactTime from "../../utils/exactTime";
import readableTime from "../../utils/readableTime";

interface Props {
  time: string;
}

export default function TimeDisplay({ time }: Props) {
  const { language } = useLanguage();

  return (
    <span title={exactTime(time, language)}>
      {readableTime(time, language)}
    </span>
  );
}
