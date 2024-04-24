export default function readableTime(time: string, lang: "uz" | "en") {
  const startTime = new Date(time).getTime();
  const endTime = new Date().getTime();

  const oneMinute = 1000 * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;
  const oneMonth = oneWeek * 4;
  const oneYear = oneMonth * 12;

  const milliseconds = endTime - startTime;

  if (milliseconds < oneMinute) {
    const relative_time = Math.round(milliseconds / 1000);
    if (lang === "uz") {
      return relative_time + " soniya oldin";
    } else if (relative_time === 1) {
      return "1 second ago";
    } else {
      return relative_time + " seconds ago";
    }
  }

  if (milliseconds < oneHour) {
    const relative_time = Math.round(milliseconds / oneMinute);
    if (lang === "uz") {
      return relative_time + " daqiqa oldin";
    } else if (relative_time === 1) {
      return "1 minute ago";
    } else {
      return relative_time + " minutes ago";
    }
  }

  if (milliseconds < oneDay) {
    const relative_time = Math.round(milliseconds / oneHour);
    if (lang === "uz") {
      return relative_time + " soat oldin";
    } else if (relative_time === 1) {
      return "1 hour ago";
    } else {
      return relative_time + " hours ago";
    }
  }

  if (milliseconds < oneWeek) {
    const relative_time = Math.round(milliseconds / oneDay);
    if (lang === "uz") {
      return relative_time + " kun oldin";
    } else if (relative_time === 1) {
      return "1 day ago";
    } else {
      return relative_time + " days ago";
    }
  }

  if (milliseconds < oneMonth) {
    const relative_time = Math.round(milliseconds / oneWeek);
    if (lang === "uz") {
      return relative_time + " hafta oldin";
    } else if (relative_time === 1) {
      return "1 week ago";
    } else {
      return relative_time + " weeks ago";
    }
  }

  if (milliseconds < oneYear) {
    const relative_time = Math.round(milliseconds / oneMonth);
    if (lang === "uz") {
      return relative_time + " oy oldin";
    } else if (relative_time === 1) {
      return "1 month ago";
    } else {
      return relative_time + " months ago";
    }
  }

  const relative_time = Math.round(milliseconds / oneYear);
  if (lang === "uz") {
    return relative_time + " yil oldin";
  } else if (relative_time === 1) {
    return "1 year ago";
  } else {
    return relative_time + " years ago";
  }
}
