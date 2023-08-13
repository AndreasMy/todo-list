import {
  isSameDay,
  isSameWeek,
  isSameMonth,
  parseISO,
  format,
  isToday,
} from "date-fns";
import {
  findTabArray,
  selectProjectArray,
  removeElements,
  selectedProjectID,
} from "../helpers/utils";
import { storeArray, retrieveArray, projects, tasks } from "../helpers/crud";

//* Dates for data sorting
function fetchDates(array) {
  const getDates = array.map((element) => {
    const date = parseISO(element.date);
    return { date, element };
  });

  return getDates;
}

//* Dates for rendered task items
function getFormattedDates(array) {
  const formattedDates = array.map((obj) => {
    const date = parseISO(obj.date);
    const formattedDate = format(date, "EEE MMM dd yyy");
    return formattedDate;
  });

  return formattedDates;
}

function sortDates() {
  return {
    isToday: (dateLeft, dateRight) => isSameDay(dateLeft, dateRight),
    isThisWeek: (dateLeft, dateRight) => isSameWeek(dateLeft, dateRight),
    isThisMont: (dateLeft, dateRight) => isSameMonth(dateLeft, dateRight),
  };
}

function sortByDate(filterFn) {
  const today = new Date();
  const filteredTasks = tasks.filter((task) =>
    filterFn(parseISO(task.date), today)
  );
  console.log("Filtered tasks:", filteredTasks);
  return filteredTasks;
}





export { fetchDates, getFormattedDates, sortDates, sortByDate };
