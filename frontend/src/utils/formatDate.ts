export function formatDate(
  dateString: string,
  locale: string = "en-US"
): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    // timeZoneName: "short",
  };

  const date = new Date(dateString);
  return date.toLocaleDateString(locale, options);
}
