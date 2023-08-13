import { projects } from "./crud";

let selectedProjectID = null;
let chosenModal = "";

const setChosenModal = (value) => {
  chosenModal = value;
  console.log(chosenModal)
};

function setSelectedProject(targetID) {
  selectedProjectID = targetID;
}

function clearSelectedProject() {
  selectedProjectID = null;
}

//! obsolete?
function hasPersistentID(element) {
  const persitentTabIDs = ["completeBtn", "weekBtn", "todayBtn", "generalBtn"];
  return persitentTabIDs.includes(element.id);
}
//! obsolete?
function hasDynamicID(element) {
  const prefix = "tab";
  return element.id.startsWith(prefix);
}

//? replaces the above 2 functions in eventDelegation
function checkIfStatic(element) {
  return element.isStatic === true;
}

function checkIfAvailableForStorage(targetID) {
  const selectedProject = selectObjectByID(targetID);
  return selectedProject ? selectedProject.isTaskStorageEnabled : null
}

function removeElements(classID) {
  const container = document.querySelector(classID);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function selectObjectByID(targetID) {
  const selectedProject = projects.find((project) => project.id === targetID);
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
  hasDynamicID,
  selectProjectArray,
  removeElements,
  chosenModal,
  setChosenModal,
  checkIfStatic,
  selectTabTitle,
  selectObjectByID,

  checkIfAvailableForStorage
};
