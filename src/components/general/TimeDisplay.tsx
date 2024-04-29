import exactTime from "../../utils/exactTime";
import readableTime from "../../utils/readableTime";

interface Props {
  time: string;
}

export default function TimeDisplay({ time }: Props) {
  return <span title={exactTime(time, "en")}>{readableTime(time, "en")}</span>;
}
