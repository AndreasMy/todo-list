import { renderTaskItems } from "./taskElements";

import {
  removeElements,
  selectTabTitle,
  checkIfStatic,
  selectedProjectID,
  filterStaticTasks,
  filterProjectTask,
} from "../helpers/utils";
import { textFactory } from "../helpers/elementFactories";
import { projects, tasks, completed } from "../helpers/crud";
import { sortDates, sortByDate, sortByTabID } from "../data/taskData";
import { storeArray, retrieveArray } from "../data/localStorage";
import { createStaticTabs } from "./pageElements";
import { arMA } from "date-fns/locale";

let staticTasks = filterStaticTasks();
let projectTasks = filterProjectTask();

//* Using currying here...make sure to learn more
function createTabRenderer(targetID, array) {
  // staticTasks should be updated elsewhere, used here because of fn call in ED
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
  header.innerHTML = "";
  header.appendChild(textFactory("h2", "app-header-title", text));
}

function renderTabHeader(targetID) {
  const staticTabs = createStaticTabs();
  const allProjects = projects.concat(staticTabs);
  const selectedProject = allProjects.find(
    (project) => project.id === targetID
  );

  const tabTitle = selectedProject ? selectedProject.title : "Not found";
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
  const staticTabs = createStaticTabs();
  const allProjects = projects.concat(staticTabs);

  const targetProject = allProjects.find((project) => project.id === targetID);
  const tab = document.querySelector(`#${targetID}`);
  const tabs = document.querySelectorAll(".project-tab");
  const tabRmBtns = document.querySelectorAll(".tab-rm-btn");

  tabs.forEach((tab) => {
    tab.style.backgroundColor = "rgb(231, 231, 231)";
    tab.style.color = "black";
  });

  tabRmBtns.forEach((btn) => {
    btn.style.color = "black";
  });

  if (targetProject) {
    tab.style.backgroundColor = "rgb(207, 35, 35)";
    tab.style.color = "antiquewhite";

    const selectedTabRmBtn = document.querySelector(`#${targetID} .tab-rm-btn`);
    if (selectedTabRmBtn) {
      selectedTabRmBtn.style.color = "rgb(255, 255, 255)";
    }
  } else {
    tab.style.backgroundColor = "rgb(255, 255, 255)";
  }
}

function removeTask(taskID) {
  removeElements(".app-content");
  const arrayFromStorage = retrieveArray("taskArray");

  // findIndex needs their respective array indices
  const taskIndex = tasks.findIndex((task) => task.id === taskID);
  const storageIndex = arrayFromStorage.findIndex((task) => task.id === taskID);

  if (taskIndex !== -1 && storageIndex !== -1) {
    tasks.splice(taskIndex, 1);
    arrayFromStorage.splice(storageIndex, 1);

    storeArray("taskArray", tasks);

    // Update staticTasks array
    staticTasks = filterStaticTasks();

    const renderTab = createTabRenderer(selectedProjectID);
    renderTab();

    console.log(projects);
    console.log(tasks);
  }
}

function removeTab(tabID) {
  removeElements(".project-content-container");
  removeElements(".app-content");

  const arrayFromStorage = retrieveArray("projectArray");
  let taskFromStorage = retrieveArray("taskArray");

  const tabIndex = projects.findIndex((tab) => tab.id === tabID);
  const storageIndex = arrayFromStorage.findIndex((tab) => tab.id === tabID);

  if (tabIndex !== -1 && storageIndex !== -1) {
    projects.splice(tabIndex, 1);
    arrayFromStorage.splice(storageIndex, 1);
    storeArray("projectArray", projects);

    taskFromStorage = taskFromStorage.filter((task) => task.tabID !== tabID);
    storeArray("taskArray", taskFromStorage);

    console.log(taskFromStorage);
    console.log(tabID);


    defaultTab("tabinbox", staticTasks);
  }
}

export {
  setCategoryHeader,
  removeTask,
  highlightTab,
  goToTab,
  createTabRenderer,
  defaultTab,
  removeTab,
};
