import { renderTaskModal, modalPriority, modalDate } from "./modal";
import { renderPage } from "../modules/page";
import { renderTaskItems } from "./taskItems";
import { renderProjectTab } from "./sidebar";
import { projectFactory, taskFactory, filteredArrays } from "../modules/crud";
import {
  selectedProjectID,
  selectProjectArray,
  removeElements,
  chosenModal,
  setChosenModal,
  findTabArray,
} from "../modules/utils";
import { projects } from "../modules/crud";
import { storeArray, fetchLocalStorage, localData, copyArray } from "../modules/localStorage";
import { fetchDates, pushToArr } from "../modules/sortTasks";

const generalTabArray = findTabArray(projects, "tabgeneral");
const fetchedTabArray =  fetchLocalStorage(localData, "tabgeneral") //! Wrong category
console.log(fetchedTabArray)

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

//* Returns an object from the input fields in the modal
function getModalInput() {
  return {
    title: (formID) => document.querySelector(formID).value,
    description: (descriptionFromID) =>
      document.querySelector(descriptionFromID).value,
    priority: (priority) =>
      document.querySelector(`input[name="${priority}"]:checked`).value,
    date: () => document.querySelector("#dueDate").value,
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
  console.log("Modal input:", modalInput);
  const title = modalInput.title(titleFormID);
  const description = modalInput.description(projectFormID);

  let newElement = null;

  switch (chosenModal) {
    case "projectModal":
      //* functionHandler === projectFactory
      newElement = functionHandler(title, description);
      break;
    case "taskModal":
      const priority = modalInput.priority(radioID);
      const date = modalInput.date();
      //* functionHandler === taskFactory
      newElement = functionHandler(title, description, priority, date);
      break;
    // Add more cases if needed for other modals
    default:
      // Handle default case if needed
      break;
  }

  console.log(newElement);

  //? replace push with local storage here
  array.push(newElement);
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
      array: generalTabArray,
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
  const projectArray = findTabArray(fetchedTabArray, "tabgeneral");
  const staticBtns = filteredArrays().static();
  const dynamicBtns = filteredArrays().dynamic();
  removeElements("#content");
  pushToArr();
  renderPage();
  renderTaskItems(projectArray);
  renderProjectTab(dynamicBtns, ".project-content-container");
  renderProjectTab(staticBtns, ".static-tab-container");
  console.log(projects)
}

function removeTask(index) {
  removeElements(".app-content");
  //?
  if (selectedProjectID !== null) {
    const projectArray = selectProjectArray(selectedProjectID);
    projectArray.splice(index, 1);
    renderTaskItems(projectArray);
  } else {
    generalTabArray.splice(index, 1);
    renderTaskItems(generalTabArray);
    console.log(generalTabArray)
  }
}

export { closeModal, removeTask, selectProjectArray, submitObject, openModal };
