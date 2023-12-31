import { isSameDay, isSameWeek, isSameMonth, parseISO, format } from "date-fns";
import { selectedProjectID } from "../helpers/utils";
import { tasks } from "../helpers/crud";

//* Dates for data sorting
function fetchDates(array) {
  const getDates = array.map((element) => {
    const date = parseISO(element.date);
    return { date, element };
  });

  return getDates;
}

//* Dates for rendered task items
function getFormattedDates(dateString) {
  const date = parseISO(dateString);
  const formattedDate = format(date, "EEE MMM dd yyyy");
  return formattedDate;
}

function sortDates() {
  return {
    isToday: (dateLeft, dateRight) => isSameDay(dateLeft, dateRight),
    isThisWeek: (dateLeft, dateRight) => isSameWeek(dateLeft, dateRight),
    isThisMont: (dateLeft, dateRight) => isSameMonth(dateLeft, dateRight),
  };
}

function sortByDate(filterFn, array) {
  const today = new Date();
  console.log(today)
  const filteredTasks = array.filter((task) =>
    filterFn(parseISO(task.date), today)
  );
  console.log("Filtered tasks:", filteredTasks);
  return filteredTasks;
}

function sortByTabID() {
  const filteredTasks = tasks.filter(
    (task) => selectedProjectID === task.tabID
  );
  return filteredTasks;
}

export { fetchDates, getFormattedDates, sortDates, sortByDate, sortByTabID };
