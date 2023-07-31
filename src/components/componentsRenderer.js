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

const generalTab = findTabArray("tabgeneral");

//* Returns an object from the input fields in the modal
function getModalInput() {
  return {
    title: (formID) => document.querySelector(formID).value,
    description: (descriptionFromID) =>
      document.querySelector(descriptionFromID).value,
    priority: (priority) =>
      document.querySelector(`input[name="${priority}"]:checked`).value,
  };
}

//* Retrieves arguments that populate factory function stored in newElement
function pushFormSubmission(
  titleFormID,
  projectFormID,
  radioID,
  functionHandler,
  array
) {
  const modalInput = getModalInput();
  const title = modalInput.title(titleFormID);
  const description = modalInput.description(projectFormID);

  let newElement = null;

  
  if (chosenModal === "projectModal") {
    newElement = functionHandler(title, description);
  } else if (chosenModal === "taskModal") {
    const priority = modalInput.priority(radioID);
    newElement = functionHandler(title, description, priority);
  }

  console.log(newElement);
  //* Variable for date picker

  array.push(newElement);
}

function openModal() {
  return {
    taskModal: () => {
      setChosenModal("taskModal");
      //* Render modal Elements
      renderTaskModal("Add Task", "task", "Task:", "description", submitObject);
      modalDate();
      modalPriority();

      //* Auto select input field
      const inputField = document.querySelector("#task");
      inputField.focus();
    },

    projectModal: () => {
      setChosenModal("projectModal");
      //* Render modal Elements
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

function submitObject() {
  const modalDataMap = {
    projectModal: {
      titleFormID: "#project",
      descriptionFromID: "#projectDescription",
      functionHandler: projectFactory,
      array: projects,
    },
    taskModal: {
      titleFormID: "#task",
      descriptionFromID: "#description",
      radioID: "priority",
      functionHandler: taskFactory,
      array: generalTab,
    },
  };

  const modalData = modalDataMap[chosenModal];
  console.log(modalData);

  if (modalData) {
    pushFormSubmission(
      modalData.titleFormID,
      modalData.descriptionFromID,
      modalData.radioID,
      modalData.functionHandler,
      modalData.array
    );
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
