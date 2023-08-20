import { projects, tasks } from "./crud";

let selectedProjectID = "tabinbox";
let chosenModal = "";

const setChosenModal = (value) => {
  chosenModal = value;
  console.log(chosenModal);
};

function setSelectedProject(targetID) {
  selectedProjectID = targetID;
}

function clearSelectedProject() {
  selectedProjectID = null;
}

//! obsolete?
function hasPersistentID(element) {
  const persitentTabIDs = ["tabinbox", "tabtoday", "tabweek", "tabcompleted"];
  return persitentTabIDs.includes(element.id);
}

//! obsolete?
function elementIsTab(element) {
  const prefix = "tab";
  return element.id.startsWith(prefix);
}

//? replaces the above 2 functions in eventDelegation
function checkIfStatic(element) {
  return element.isStatic === true;
}

function taskParamHelper() {
  if (
    selectedProjectID === "tabinbox" ||
    selectedProjectID === "tabtoday" ||
    selectedProjectID === "tabweek" ||
    selectedProjectID === "tabcompleted"
  ) {
    return {
      staticTask: true,
      projectTask: false,
    };
  } else {
    return {
      staticTask: false,
      projectTask: true,
    };
  }
}

function filterStaticTasks() {
  return tasks.filter((task) => task.isGeneralTask === true);
}

function filterProjectTask() {
  return tasks.filter((task) => task.isProjectTask === true);
}

function checkIfAvailableForStorage(targetID) {
  const selectedProject = selectObjectByID(targetID);
  return selectedProject ? selectedProject.isTaskStorageEnabled : null;
}

function removeElements(classID) {
  const container = document.querySelector(classID);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//? add parameter for flexibility - or change it to select retrievedArray
function selectObjectByID(targetID) {
  const selectedProject = retrievedArray.find(
    (project) => project.id === targetID
  );
  return selectedProject;
}

function selectTabTitle(targetID) {
  const selectedProject = selectObjectByID(targetID);
  return selectedProject ? selectedProject.title : "Not found";
}

function selectProjectArray(targetID) {
  const selectedProject = selectObjectByID(targetID);
  return selectedProject ? selectedProject.taskArray : null;
}

export {
  selectedProjectID,
  setSelectedProject,
  clearSelectedProject,
  hasPersistentID,
  elementIsTab,
  selectProjectArray,
  removeElements,
  chosenModal,
  setChosenModal,
  checkIfStatic,
  selectTabTitle,
  selectObjectByID,
  checkIfAvailableForStorage,
  filterStaticTasks,
  filterProjectTask,
  taskParamHelper,
};
