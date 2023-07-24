//* a todo is an object
//* a project is an array of objects

//* createObject is a factory for object arrays
//* Submit button creates named Project button and "opens" its corresponding tab

//TODO: Create an object using taskFactory()
//TODO: Create component that displays object

import { renderTaskItems, renderTaskModal } from "./component";
import { renderPage } from "./page";

const tasks = [];

//* Todo factory
const taskFactory = (title, description) => {
  return { title: title, description: description };

  // priority
  // dueDate
};

//* Project factory
const projectFactory = () => {
  // name
  // description
  // create array and assign

  return {};
};

function defaultTasks() {
  let task1 = taskFactory("Get started", "Getting started");
  let task2 = taskFactory(
    "Continue starting",
    "Try to keep going with getting started"
  );
  tasks.push(task1, task2);
}
defaultTasks();

function removeElements() {
  const appContainer = document.querySelector(".app-content");
  while (appContainer.firstChild) {
    appContainer.removeChild(appContainer.firstChild);
  }
}

function openTaskModal() {
  renderTaskModal("Add Task", "task", "Task:", "addTaskBtn", submitEntry);
}

function openProjectModal() {
  renderTaskModal("Add Project", "project", "Project:", "addProjectBtn", submitEntry);
}

function closeModal() {
  const content = document.querySelector("#content");
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  renderPage();
  renderTaskItems();
}

function removeTask(index) {
  tasks.splice(index, 1);
  removeElements();
  renderTaskItems();
}

function submitEntry(event) {
  event.preventDefault();
  const task = document.querySelector("#task").value;
  const description = document.querySelector("#description").value;
  const newTask = taskFactory(task, description);
  tasks.push(newTask);

  document.querySelector("#task").value = "";
  document.querySelector("#description").value = "";

  closeModal();
}

export {
  taskFactory,
  projectFactory,
  removeElements,
  tasks,
  removeTask,
  closeModal,
  submitEntry,
  openProjectModal,
  openTaskModal,
};
