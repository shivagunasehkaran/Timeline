import BrushingHistory from "../assets/brushing_history.json";
import moment from "moment";

export let SortedArray = BrushingHistory.sort(function (a, b) {
  let startDate = `${moment.utc(a.date).format("YYYY/MM/DD")}
      ${moment.utc(a.date).format("hh:mm a")}`;
  let endDate = `${moment.utc(b.date).format("YYYY/MM/DD")}
    ${moment.utc(b.date).format("hh:mm a")}`;
  let c = new Date(startDate);
  let d = new Date(endDate);
  return c - d;
});
