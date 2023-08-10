import { isSameDay, isSameWeek, parseISO, format } from "date-fns";
import { findTabArray } from "../helpers/utils";
import { storeArray, retrieveArray, projects } from "../helpers/crud";

const generalTab = findTabArray("tabgeneral");
const todayTab = findTabArray("tabtoday");
const weekTab = findTabArray("tabweek");

//* Dates for data sorting
function fetchDates(array) {
  const getDates = array.map((element) => {
    const dates = parseISO(element.date);
    return dates;
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
  };
}

function pushToArr() {
  const dates = fetchDates(generalTab);

  const today = new Date();

  dates.forEach((date, index) => {
    console.log(`Date at index ${index}: ${date}`);
    if (sortDates().isToday(date, today)) {
      if (!todayTab.includes(generalTab[index])) {
        todayTab.push(generalTab[index]);
      }
    } else if (sortDates().isThisWeek(date, today)) {
      if (!weekTab.includes(generalTab[index])) {
        weekTab.push(generalTab[index]);
      }
    }
  });
  storeArray(projects);
  retrieveArray();
}

export { fetchDates, pushToArr, getFormattedDates };
