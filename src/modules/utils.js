import { projects } from "./crud";
import { localData } from "./localStorage";
import { fetchLocalStorage } from "./localStorage";

const retrievedArray = fetchLocalStorage();

let selectedProjectID = null;
let chosenModal = "";

const setChosenModal = (value) => {
  chosenModal = value;
  console.log(chosenModal);
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
  const prefix = "tab";
  return element.id.startsWith(prefix);
}

//? add parameter for flexibility - or change it to select retrievedArray
function getObjectArray() {
  const getArray = retrievedArray.id.taskArray;
  return getArray;
}

//? add parameter for flexibility - or change it to select retrievedArray
function findTabArray(array, tabID) {
  const tabProject = array.find((project) => project.id === tabID);
  return tabProject.taskArray;
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
  selectTabTitle,
  selectObjectByID,
  getObjectArray,
  findTabArray,
};
