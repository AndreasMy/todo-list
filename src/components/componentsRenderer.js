import { renderTaskModal } from "./modal";
import { renderPage } from "../modules/page";
import { renderTaskItems } from "./taskItems";
import { renderProjectTab } from "./sidebar";

import { tasks, projects, projectFactory, taskFactory } from "../modules/crud";


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

function openTaskModal() {
  renderTaskModal(
    "Add Task",
    "task",
    "Task:",
    "description",
    "#addTaskBtn",
    submitEntry
  );
}

function openProjectModal() {
  renderTaskModal(
    "Add Project",
    "project",
    "Project:",
    "projectDescription",
    "#addProjectBtn",
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
};
