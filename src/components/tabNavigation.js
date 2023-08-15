import { renderTaskItems } from "./taskElements";

import {
  removeElements,
  selectTabTitle,
  checkIfStatic,
  selectObjectByID,
  selectedProjectID,
  filterStaticTasks,
  filterProjectTask,
} from "../helpers/utils";
import { textFactory } from "../helpers/elementFactories";
import { projects, tasks } from "../helpers/crud";
import { sortDates, sortByDate, sortByTabID } from "../data/taskData";

let staticTasks = filterStaticTasks();
let projectTasks = filterProjectTask();

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

function renderTabContent(targetID) {
  removeElements(".app-content");
  renderTabHeader(targetID);
  const targetProject = projects.find((project) => project.id === targetID);

  if (targetProject && checkIfStatic(targetProject)) {
    console.log("Static Tab");
    staticTabNav(targetID);
  } else {
    console.log("Project Tab");
    projectTabNav(targetID);
  }
}

function staticTabNav(targetID) {
  const selectedTab = selectObjectByID(targetID);
  staticTasks = filterStaticTasks();
  console.log(staticTasks);

  if (selectedTab.id === "tabinbox") {
    renderTaskItems(staticTasks);
  } else if (selectedTab.id === "tabtoday") {
    const isTodayFilter = sortDates().isToday;
    const displayToday = sortByDate(isTodayFilter, staticTasks);
    renderTaskItems(displayToday);
  } else if (selectedTab.id === "tabweek") {
    const isThisWeekFilter = sortDates().isThisWeek;
    const displayWeek = sortByDate(isThisWeekFilter, staticTasks);
    renderTaskItems(displayWeek);
  }
}

function projectTabNav() {
  projectTasks = filterProjectTask();
  const tabTask = sortByTabID();
  renderTaskItems(tabTask);
  console.log(tabTask);
}

function removeTask(taskID) {
  removeElements(".app-content");
  const taskIndex = tasks.findIndex((task) => task.id === taskID);
  console.log(taskIndex);

  tasks.splice(taskIndex, 1);

  staticTasks = filterStaticTasks();
  renderTaskItems(staticTasks);

  console.log(projects);
  console.log(tasks);
}

function highlightTab() {
  //code
}

//TODO: for static tabs, run switch statement for filters based on date
//TODO: this function is run in eventDelagation if tab is static

export { renderTabContent, setCategoryHeader, removeTask, staticTabNav };
