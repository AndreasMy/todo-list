import { renderTaskItems } from "../components/taskElements";
import { renderPage } from "../components/pageElements";
import { taskFactory, projectFactory } from "../helpers/crud";
import { filteredArrays } from "../helpers/crud";
import { pushToArr } from "../data/taskData";
import { renderTaskModal } from "../components/modalElements";
import { projects, tasks } from "../helpers/crud";
import { renderProjectTab } from "../components/tabElements";
import {
  selectedProjectID,
  selectProjectArray,
  removeElements,
  chosenModal,
  setChosenModal,
  findTabArray,
} from "../helpers/utils";
import {
  modalPriority,
  modalDate,
  modalProjectMenu,
} from "../components/modalElements";

// const tasks = findTabArray("tabgeneral");

//* Returns an object from the input fields in the modal
function getModalInput() {
  return {
    title: (formID) => document.querySelector(formID).value,
    description: (descriptionFromID) =>
      document.querySelector(descriptionFromID).value,
    priority: (priority) =>
      document.querySelector(`input[name="${priority}"]:checked`).value,
    date: () => document.querySelector("#dueDate").value,
    destination: () => document.querySelector("#taskDestination").value,
  };
}

//* Called in submitObject()
//* Retrieves form data from getModalInput
//* Uses form data to populate factory function stored in newElement
function pushFormSubmission(
  titleFormID,
  projectFormID,
  radioID,
  functionHandler,
  array
) {
  const modalInput = getModalInput();

  const modalData = {
    projectModal: {
      handler: () => {
        const title = modalInput.title(titleFormID);
        const description = modalInput.description(projectFormID);
        return functionHandler(title, description, false, true);
      },
    },
    taskModal: {
      handler: () => {
        const title = modalInput.title(titleFormID);
        const description = modalInput.description(projectFormID);
        const priority = modalInput.priority(radioID);
        const date = modalInput.date();
        return functionHandler(title, description, priority, date);
      },
    },
  };

  const newElement = modalData[chosenModal]?.handler();

  if (newElement !== undefined) {
    console.log(newElement);
    array.push(newElement);
  }
}

//* Called in eventDelgcation
function openModal() {
  return {
    taskModal: () => {
      setChosenModal("taskModal");
      //* Render modal Elements
      renderTaskModal("Add Task", "task", "Task:", "description", submitObject);
      modalDate();
      modalPriority();
      modalProjectMenu();

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
      array: tasks,
    },
  };

  const modalData = modalDataMap[chosenModal];

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
  //pushToArr();
  renderPage();
  renderTaskItems(tasks);
  renderProjectTab(dynamicBtns, ".project-content-container");
  renderProjectTab(staticBtns, ".static-tab-container");
  console.log(tasks)
  console.log(projects)
}



export { closeModal, submitObject, openModal };
