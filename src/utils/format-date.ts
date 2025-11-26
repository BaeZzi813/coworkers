export function formatDate(ISO: string) {
  const date = new Date(ISO);
  if (isNaN(date.getTime())) return "";
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date).replace(/\s/g, "").replace(/\.$/, "");
}
