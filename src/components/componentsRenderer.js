import { renderTaskModal } from "./modal";
import { renderPage } from "../modules/page";
import { renderTaskItems } from "./taskItems";
import { renderProjectTab } from "./sidebar";

import { tasks, projects, projectFactory, taskFactory } from "../modules/crud";
import { textFactory } from "../modules/elementFactories";

function submitProject(event) {
  event.preventDefault();
  const project = document.querySelector("#project").value;
  const description = document.querySelector("#projectDescription").value;

  const newProject = projectFactory(project, description);
  projects.push(newProject);

  document.querySelector("#project").value = "";
  document.querySelector("#projectDescription").value = "";

  closeModal();
}

//? see if you can use the same function for both buttons
function submitEntry(event) {
  event.preventDefault();
  const task = document.querySelector("#task").value;
  const description = document.querySelector("#description").value;

  //* Create new task
  const newTask = taskFactory(task, description);
  tasks.push(newTask);

  //* Clearing input fields
  document.querySelector("#task").value = "";
  document.querySelector("#description").value = "";

  closeModal();
}

function selectProjectArray(targetID) {
  const selectedProject = projects.find((project) => project.id === targetID);
  //console.log(selectedProject.taskArray);
  return selectedProject ? selectedProject.taskArray : false;
}

function selectProjectID(targetID) {
  return (selectedID = targetID);
}

function removeElements(classID) {
  const container = document.querySelector(classID);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
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

function openTaskModal() {
  renderTaskModal("Add Task", "task", "Task:", "description", submitEntry);
}

function openProjectModal() {
  renderTaskModal(
    "Add Project",
    "project",
    "Project:",
    "projectDescription",
    submitProject
  );
}

function closeModal() {
  removeElements("#content");
  renderPage();
  renderTaskItems();
  renderProjectTab();
}

function removeTask(index) {
  tasks.splice(index, 1);
  removeElements(".app-content");
  renderTaskItems();
}

export {
  submitEntry,
  submitProject,
  openProjectModal,
  openTaskModal,
  closeModal,
  removeTask,
  renderByCategory,
  setCategoryHeader,
  selectProjectArray,
  selectProjectID,
  removeElements,
};
