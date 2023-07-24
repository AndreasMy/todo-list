//* a todo is an object
//* a project is an array of objects

//* createObject is a factory for object arrays
//* Submit button creates named Project button and "opens" its corresponding tab

//TODO: Create an object using taskFactory()
//TODO: Create component that displays object

import { renderTaskItems, renderTaskModal } from "./component";

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

function openModal() {
  renderTaskModal()
}

function removeTask(index) {
  tasks.splice(index, 1);
  removeElements();
  renderTaskItems();
}

export { taskFactory, projectFactory, removeElements, tasks, removeTask, openModal };
