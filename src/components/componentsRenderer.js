import { renderTaskModal } from "./modal";
import { renderPage } from "../modules/page";
import { renderTaskItems, renderSelectedTab } from "./tabNavigation";
import { renderProjectTab } from "./sidebar";
import { tasks, projects, staticTabs, projectFactory, taskFactory } from "../modules/crud";
import { textFactory } from "../modules/elementFactories";
import {
  selectedProjectID,
  selectProjectArray,
  removeElements,
  chosenModal,
  setChosenModal,
} from "../modules/utils";

function openModal() {
  return {
    taskModal: () => {
      setChosenModal("taskModal");
      renderTaskModal("Add Task", "task", "Task:", "description", submitObject);
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
      const inputField = document.querySelector("#project");
      inputField.focus();
    },
  };
}

function getModalInput() {
  return {
    title: (formID) => document.querySelector(formID).value,
    description: (descriptionFromID) =>
      document.querySelector(descriptionFromID).value,
  };
}

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
    pushFormSubmission("#task", "#description", taskFactory, tasks);
  }
  closeModal();
}

function closeModal() {
  removeElements("#content");
  renderPage();
  renderTaskItems(tasks);
  renderProjectTab(projects, ".project-content-container");
  renderProjectTab(staticTabs, ".static-tab-container");
}

function setCategoryHeader(text) {
  const header = document.querySelector(".header-title-wrapper");
  header.innerHTML = ""; // Clear existing content
  header.appendChild(textFactory("h2", "app-header-title", text));
}

function renderByCategory(categoryId) {
  switch (categoryId) {
    case "generalBtn":
      setCategoryHeader("General");
      renderTaskItems(tasks);
      break;
    case "todayBtn":
      setCategoryHeader("Today");
      break;
    case "weekBtn":
      setCategoryHeader("This Week");
      break;
    case "completeBtn":
      setCategoryHeader("Completed");
      break;

    default:
      setCategoryHeader("General");
      break;
  }
}

function removeTask(index) {
  removeElements(".app-content");

  if (selectedProjectID !== null) {
    const projectArray = selectProjectArray(selectedProjectID);
    projectArray.splice(index, 1);
    renderTaskItems(projectArray);
  } else {
    tasks.splice(index, 1);
    renderTaskItems(tasks);
  }
}

export {
  closeModal,
  removeTask,
  renderByCategory,
  setCategoryHeader,
  selectProjectArray,
  submitObject,
  openModal,
};
