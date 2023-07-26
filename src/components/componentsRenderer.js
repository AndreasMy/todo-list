import { renderTaskModal } from "./modal";
import { renderPage } from "../modules/page";
import { renderTaskItems } from "./tabNavigation";
import { renderProjectTab } from "./sidebar";
import { tasks, projects, projectFactory, taskFactory } from "../modules/crud";
import { textFactory } from "../modules/elementFactories";
import {
  selectedProjectID,
  selectProjectArray,
  removeElements,
  chosenModal,
  setChosenModal,
} from "../modules/utils";

function openTaskModal() {
  setChosenModal("taskModal");
  console.log(chosenModal);
  renderTaskModal("Add Task", "task", "Task:", "description", submitObject);
}

function openProjectModal() {
  setChosenModal("projectModal");
  console.log(chosenModal);
  renderTaskModal(
    "Add Project",
    "project",
    "Project:",
    "projectDescription",
    submitObject
  );
}

function getModalInput() {
  return {
    title: (formID) => document.querySelector(formID).value,
    description: (descriptionFromID) =>
      document.querySelector(descriptionFromID).value,
  };
}

function pushFormSubmission(titleFormID, projectFormID, functionHandler, array ) {
  const modalInput = getModalInput();
  const title = modalInput.title(titleFormID);
  const description = modalInput.description(projectFormID);
  const newElement = functionHandler(title, description);
  array.push(newElement);
}

function submitObject() {
  if (chosenModal === "projectModal") {
    pushFormSubmission("#project", "#projectDescription", projectFactory, projects )
  } else if (chosenModal === "taskModal") {
    pushFormSubmission("#task", "#description", taskFactory,  tasks )
  }
  closeModal();
}

function setCategoryHeader(text) {
  const header = document.querySelector(".header-title-wrapper");
  header.innerHTML = ""; // Clear existing content
  header.appendChild(textFactory("h2", "app-header-title", text));
}

function closeModal() {
  removeElements("#content");
  renderPage();
  renderTaskItems(tasks);
  renderProjectTab();
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
  openProjectModal,
  openTaskModal,
  closeModal,
  removeTask,
  renderByCategory,
  setCategoryHeader,
  selectProjectArray,
  submitObject,
};
