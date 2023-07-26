import { renderTaskModal } from "./modal";
import { renderPage } from "../modules/page";
import { renderTaskItems } from "./tabNavigation";
import { renderProjectTab } from "./sidebar";
import { tasks, projects, projectFactory, taskFactory } from "../modules/crud";
import { textFactory } from "../modules/elementFactories";
import { selectedProjectID, selectProjectArray } from "../modules/utils";

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
  renderTaskItems(tasks);
  renderProjectTab();
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
  submitEntry,
  submitProject,
  openProjectModal,
  openTaskModal,
  closeModal,
  removeTask,
  renderByCategory,
  setCategoryHeader,
  selectProjectArray,
  removeElements,
};
