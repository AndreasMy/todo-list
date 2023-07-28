import { projects, tasks } from "./crud";

let selectedProjectID = null;
let chosenModal = "";
const setChosenModal = (value) => {
  chosenModal = value;
};

function selectProjectID(targetID) {
  return (selectedID = targetID);
}

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
  const prefix = "tab-";
  return element.id.startsWith(prefix);
}

//? replaces the above 2 functions in eventDelegation
function checkIfStatic(element) {
  return element.isStatic === true;
}

function removeElements(classID) {
  const container = document.querySelector(classID);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function selectProjectArray(targetID) {
  const selectedProject = projects.find((project) => project.id === targetID);
  console.log(selectedProject);
  return selectedProject ? selectedProject.taskArray : tasks;
}

export {
  selectedProjectID,
  selectProjectID,
  setSelectedProject,
  clearSelectedProject,
  hasPersistentID,
  hasDynamicID,
  selectProjectArray,
  removeElements,
  chosenModal,
  setChosenModal,
  checkIfStatic,
};
