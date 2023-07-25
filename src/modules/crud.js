//* createObject is a factory for object arrays
//* Submit button creates named Project button and "opens" its corresponding tab

import { closeModal, renderProjectTab } from "./component";

const tasks = [];
const projects = [];
console.log(projects)

//* Todo factory
const taskFactory = (title, description) => {
  return { title, description };
};

//* Project factory
const projectFactory = (title, description) => {
  const tabID = generateTabId(title);
  const tab = {
    id: tabID,
    title,
    description,
  };

  return tab;
};

function generateTabId(title) {
  const formattedName = title.toLowerCase().replace(/\s+/g, "-");
  return `tab-${formattedName}`;
}

function defaultTasks() {
  let task1 = taskFactory("Get started", "Getting started");
  let task2 = taskFactory(
    "Continue starting",
    "Try to keep going with getting started"
  );
  tasks.push(task1, task2);
}
defaultTasks();

function defaultProject() {
  const project = projectFactory("Trying", "To make it work")
  projects.push(project)
}
defaultProject() 

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

export {
  taskFactory,
  projectFactory,
  tasks,
  projects,
  submitEntry,
  submitProject,
};
