import { renderTaskModal, modalPriority, modalDate } from "./modal";
import { renderPage } from "../modules/page";
import { renderTaskItems } from "./taskItems";
import { renderProjectTab } from "./sidebar";
import { projects, projectFactory, taskFactory } from "../modules/crud";
import { textFactory } from "../modules/elementFactories";
import {
  selectedProjectID,
  selectProjectArray,
  removeElements,
  chosenModal,
  setChosenModal,
  findTabArray,
} from "../modules/utils";
import { filteredArrays } from "../modules/crud";

function openModal() {
  return {
    taskModal: () => {
      setChosenModal("taskModal");
      renderTaskModal("Add Task", "task", "Task:", "description", submitObject);
      modalDate();
      modalPriority();
      //* Auto select input field
      const inputField = document.querySelector("#task");
      inputField.focus();
    },

    projectModal: () => {
      setChosenModal("projectModal");
      renderTaskModal(
        "Add Project",
        "project",
        "Project:",
        "projectDescription",
        submitObject
      );

      //* Auto select input field
      const inputField = document.querySelector("#project");
      inputField.focus();
    },
  };
}

openModal().taskModal();

function getModalInput() {
  return {
    title: (formID) => document.querySelector(formID).value,
    description: (descriptionFromID) =>
      document.querySelector(descriptionFromID).value,
  };
}

const generalTab = findTabArray("tabgeneral");
console.log(generalTab);

function pushFormSubmission(
  titleFormID,
  projectFormID,
  functionHandler,
  array
) {
  const modalInput = getModalInput();
  const title = modalInput.title(titleFormID);
  const description = modalInput.description(projectFormID);
  const newElement = functionHandler(title, description);
  //* Variable for date picker
  //* Variable for priority

  array.push(newElement);
}

function submitObject() {
  if (chosenModal === "projectModal") {
    pushFormSubmission(
      "#project",
      "#projectDescription",
      projectFactory,
      projects
    );
  } else if (chosenModal === "taskModal") {
    pushFormSubmission("#task", "#description", taskFactory, generalTab);
  }
  closeModal();
}

function closeModal() {
  const staticBtns = filteredArrays().static();
  const dynamicBtns = filteredArrays().dynamic();
  removeElements("#content");
  renderPage();
  renderTaskItems(generalTab);
  renderProjectTab(dynamicBtns, ".project-content-container");
  renderProjectTab(staticBtns, ".static-tab-container");
}

function removeTask(index) {
  removeElements(".app-content");

  if (selectedProjectID !== null) {
    const projectArray = selectProjectArray(selectedProjectID);
    projectArray.splice(index, 1);
    renderTaskItems(projectArray);
  } else {
    generalTab.splice(index, 1);
    renderTaskItems(generalTab);
  }
}

export { closeModal, removeTask, selectProjectArray, submitObject, openModal };
