import moment from "moment";


export function formatDateForBackend(date) {
  const iso = date.toString();
  return moment(iso).format("YYYY-MM-DD");
}
