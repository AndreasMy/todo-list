import { isSameDay, isSameWeek, parseISO } from "date-fns";
import { findTabArray } from "./utils";
import { storeArray, retrieveArray, localData, fetchLocalStorage } from "./localStorage";
import { projects } from "./crud";

const retrievedArray = fetchLocalStorage();

const generalTab = findTabArray(retrievedArray, "tabgeneral");
const todayTab = findTabArray(retrievedArray, "tabtoday");
const weekTab = findTabArray(retrievedArray, "tabweek");



function fetchDates(array) {
  const getDates = array.map((element) => {
    const dates = parseISO(element.date);
    return dates;
  });

  return getDates;
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

}
pushToArr();

export { fetchDates, pushToArr };
