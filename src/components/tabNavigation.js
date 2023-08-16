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
import { projects, retrieveArray, tasks, completed } from "../helpers/crud";
import { sortDates, sortByDate, sortByTabID } from "../data/taskData";

let staticTasks = filterStaticTasks();
let projectTasks = filterProjectTask();


function createTabRenderer(targetID, array) {
  staticTasks = filterStaticTasks();
  const tabConfig = goToTab(targetID, array);
  const renderFunction = tabConfig.render;
  tabConfig.highlight();
  return renderFunction;
}

function defaultTab(targetID, array) {
  const renderTab = createTabRenderer(targetID, array);
  renderTab();
}


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

function goToTab(targetID) {
  const todayFilter = sortDates().isToday;
  const isThisWeekFilter = sortDates().isThisWeek;

  let selectedTab;
  const targetProject = projects.find((project) => project.id === targetID);
  if (targetProject && !checkIfStatic(targetProject)) {
    selectedTab = selectedProjectID;
  }

  return {
    tabinbox: {
      render: () => {
        renderTabHeader(targetID);
        renderTaskItems(staticTasks);
        highlightTab("tabinbox");
      },
      highlight: () => highlightTab(targetID),
    },
    tabtoday: {
      render: () => {
        renderTabHeader(targetID);
        const displayToday = sortByDate(todayFilter, staticTasks);
        renderTaskItems(displayToday);
        highlightTab("tabtoday");
      },
      highlight: () => highlightTab(targetID),
    },
    tabweek: {
      render: () => {
        renderTabHeader(targetID);
        const displayWeek = sortByDate(isThisWeekFilter, staticTasks);
        renderTaskItems(displayWeek);
        highlightTab("tabweek");
      },
      highlight: () => highlightTab(targetID),
    },
    tabcompleted: {
      render: () => {
        renderTabHeader(targetID);
        renderTaskItems(completed);
        highlightTab("tabcompleted");
      },
      highlight: () => highlightTab(targetID),
    },
    [selectedTab]: {
      render: () => {
        const tabTask = sortByTabID();
        renderTaskItems(tabTask);
      },
      highlight: () => highlightTab(targetID),
    },
  }[targetID];
}


function highlightTab(targetID) {
  const targetProject = projects.find((project) => project.id === targetID);
  const tab = document.querySelector(`#${targetID}`);
  const tabs = document.querySelectorAll(".project-tab");

  // Reset all tab styles
  tabs.forEach((tab) => {
    tab.style.backgroundColor = "rgb(231, 231, 231)";
    tab.style.color = "black";
  });

  // Apply selected tab styles
  if (targetProject) {
    tab.style.backgroundColor = "rgb(207, 35, 35)";
    tab.style.color = "antiquewhite";
  } else {
    tab.style.backgroundColor = "rgb(255, 255, 255)";
  }
}

function removeTask(taskID) {
  removeElements(".app-content");
  const taskIndex = tasks.findIndex((task) => task.id === taskID);

  tasks.splice(taskIndex, 1);

  staticTasks = filterStaticTasks();
  const renderTab = createTabRenderer(selectedProjectID);
  renderTab();

  console.log(projects);
  console.log(tasks);
}

export {
  setCategoryHeader,
  removeTask,
  highlightTab,
  goToTab,
  createTabRenderer,
  defaultTab
};
