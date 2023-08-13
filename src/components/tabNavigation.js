import { renderTaskItems } from "./taskElements";

import {
  selectProjectArray,
  setSelectedProject,
  removeElements,
  selectTabTitle,
  checkIfStatic,
  selectObjectByID,
  selectedProjectID,
  checkIfAvailableForStorage,
  clearSelectedProject,
  findTabArray,
} from "../helpers/utils";
import { textFactory } from "../helpers/elementFactories";
import { projects, tasks } from "../helpers/crud";
import { sortDates, sortByDate } from "../data/taskData";

function setCategoryHeader(text) {
  const header = document.querySelector(".header-title-wrapper");
  header.innerHTML = ""; // Clear existing content
  header.appendChild(textFactory("h2", "app-header-title", text));
}

function renderTabHeader(targetID) {
  const tabTitle = selectTabTitle(targetID);
  setCategoryHeader(tabTitle);
  console.log("Tab Title:", tabTitle);
}

//* targetID is derived from arguments event.target(.id) in eventDelegation
function renderTabContent(targetID) {
  removeElements(".app-content");
  renderTabHeader(targetID);

  const targetProject = projects.find((project) => project.id === targetID);

  if (targetProject && checkIfStatic(targetProject)) {
    console.log("Working");
    staticTabNav(targetID);
  } else {
    console.log("Not working");
  }
}

function staticTabNav(targetID) {
  const selectedTab = selectObjectByID(targetID);

  if (selectedTab.id === "tabinbox") {
    renderTaskItems(tasks);
  } else if (selectedTab.id === "tabtoday") {
    const isTodayFilter = sortDates().isToday;
    const displayToday = sortByDate(isTodayFilter);
    renderTaskItems(displayToday);
  } else if (selectedTab.id === "tabweek") {
    const isThisWeekFilter = sortDates().isThisWeek;
    const displayWeek = sortByDate(isThisWeekFilter);
    renderTaskItems(displayWeek);
  }
}

function removeTask(index) {
  removeElements(".app-content");
  tasks.splice(index, 1);

  renderTaskItems(tasks);
  console.log(selectedProjectID);
  console.log(projects);
  console.log(tasks);
}

function highlightTab() {
  //code
}

//TODO: for static tabs, run switch statement for filters based on date
//TODO: cases are decided on tab id
//TODO: task items are rendered with renderTaskItems on the filter array
//TODO: this function is run in eventDelagation if tab is static

export { renderTabContent, setCategoryHeader, removeTask, staticTabNav };
