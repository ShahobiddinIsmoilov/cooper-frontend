export default function exactTime(time: string, lang: "uz" | "en") {
  const MONTHS_UZ = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentyabr",
    "oktyabr",
    "noyabr",
    "dekabr",
  ];

  const MONTHS_EN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const DAYS_UZ = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];

  const DAYS_EN = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const datetime = new Date(time);
  const year = datetime.getFullYear();
  const month = datetime.getMonth();
  const date = datetime.getDate();
  const day = datetime.getDay();

  const hour =
    datetime.getHours() < 10 ? `0${datetime.getHours()}` : datetime.getHours();
  const minute =
    datetime.getMinutes() < 10
      ? `0${datetime.getMinutes()}`
      : datetime.getMinutes();
  const second =
    datetime.getSeconds() < 10
      ? `0${datetime.getSeconds()}`
      : datetime.getSeconds();

  const fullTime = `${hour}:${minute}:${second}`;

  const result =
    lang === "uz"
      ? `${year}-yil ${date}-${MONTHS_UZ[month]} ${DAYS_UZ[day]} kuni, soat ${fullTime} da`
      : `${DAYS_EN[day]}, ${MONTHS_EN[month]} ${date}, ${year} at ${fullTime}`;
  return result;
}
