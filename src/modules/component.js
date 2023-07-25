//* 0.0: Updating the content containder
//* 1.0: Project buttons
//* 1.1 :Project tabs and their contents
//* 2.0: Independent tasks

import { tasks, projects, submitEntry, submitProject } from "./crud";
import { renderPage } from "./page";
import {
  divFactory,
  buttonFactory,
  textFactory,
  inputFactory,
  labelFactory,
} from "./elementFactories";

function taskItemFactory(tasks) {
  const elements = tasks.map((task, index) => {
    const taskItem = divFactory("div", `task-item`);
    taskItem.classList.add(`item-${index}`);

    const itemTextWrapper = divFactory("div", "text-wrapper");
    const cplBtn = buttonFactory(
      "complete-btn",
      `completeBtn_${index}`,
      "Complete"
    );
    taskItem.appendChild(cplBtn);
    taskItem.appendChild(itemTextWrapper);
    itemTextWrapper.appendChild(
      textFactory("h4", "task-title", `${task.title}`)
    );
    itemTextWrapper.appendChild(
      textFactory("p", "task-description", `${task.description}`)
    );

    return taskItem;
  });

  return {
    elements: elements,
  };
}

function renderTaskItems() {
  const taskItems = taskItemFactory(tasks);
  const appContent = document.querySelector(".app-content");

  taskItems.elements.forEach((element, index) => {
    appContent.appendChild(element);

    //* Buttons
    const completedClick = document.querySelector(`#completeBtn_${index}`);
    completedClick.addEventListener("click", () => {
      removeTask(index);
    });
  });
}

function renderTaskModal(
  headerText,
  labelFor,
  inputLabel,
  description,
  addBtnID,
  onsubmitHandler
) {
  //* Containers
  const modalContainer = divFactory("div", "modal-container");
  const modalBackground = divFactory("div", "modal-background");
  const modalCard = divFactory("div", "modal-card");
  const inputWrapper = divFactory("div", "input-wrapper");
  const modalBtnWrapper = divFactory("div", "modal-btn-wrapper");

  //* Header
  const modalHeader = textFactory("h3", "modal-header", headerText);

  //* Inputs
  const labelTaskName = labelFactory(labelFor, inputLabel);
  const inputTaskName = inputFactory(
    "input",
    labelFor,
    labelFor,
    "Add a task..."
  );
  const labelDescription = labelFactory(description, "Description:");
  const inputDescription = inputFactory(
    "textarea",
    description,
    description,
    "Add a description..."
  );
  inputDescription.setAttribute("rows", "5");
  inputDescription.setAttribute("cols", "50");

  //* Buttons
  const addBtn = buttonFactory("add-btn", "submitBtn", "Add");
  const cancelBtn = buttonFactory("cancel-btn", "cancelBtn", "Cancel");

  //* Appending elements
  const content = document.querySelector("#content");

  modalContainer.appendChild(modalCard);
  modalContainer.appendChild(modalBackground);
  modalCard.appendChild(modalHeader);
  modalCard.appendChild(inputWrapper);

  inputWrapper.appendChild(labelTaskName);
  inputWrapper.appendChild(inputTaskName);
  inputWrapper.appendChild(labelDescription);
  inputWrapper.appendChild(inputDescription);

  modalCard.appendChild(modalBtnWrapper);
  modalBtnWrapper.appendChild(cancelBtn);
  modalBtnWrapper.appendChild(addBtn);

  content.appendChild(modalContainer);

  //* Event listeners
  const modalBg = document.querySelector(".modal-background");
  const modalCancel = document.querySelector("#cancelBtn");
  const modalConfirm = document.querySelector("#submitBtn");

  modalBg.addEventListener("click", closeModal);
  modalCancel.addEventListener("click", closeModal);
  modalConfirm.addEventListener("click", onsubmitHandler);
}

function modalTaskSettings() {
  //* Date
  //* Priority
  //? Other stuff
}

function projectSection() {
  const sidebar = document.querySelector("aside");

  //* Projects section
  const projectContainer = divFactory("div", "project-container");
  const projectContentContainer = divFactory(
    "div",
    "project-content-container"
  );
  const projectHeader = textFactory("h3", "project-header", "Projects");
  const addProjectBtn = buttonFactory(
    "add-project-btn",
    "addProjectBtn",
    "Add Project +"
  );

  sidebar.appendChild(projectContainer);
  projectContainer.appendChild(projectHeader);
  projectContainer.appendChild(projectContentContainer);
  projectContainer.appendChild(addProjectBtn);
}

function projectTabFactory(projects) {
  const elements = projects.map((project) => {
    const tabItem = divFactory("div", "project-tab");
    tabItem.setAttribute("id", `${project.id}`);

    const tabName = textFactory("h3", "tab-name", `${project.title}`);

    tabItem.appendChild(tabName);
    return tabItem;
  });

  return {
    elements: elements,
  };
}

function renderProjectTab() {
  const tabElements = projectTabFactory(projects);
  const projectContentContainer = document.querySelector(
    ".project-content-container"
  );
  console.log(tabElements.elements);
  tabElements.elements.forEach((element) => {
    projectContentContainer.appendChild(element);
  });
}

//* Element Manipulation
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
  renderProjectTab();
}

export {
  taskItemFactory,
  renderTaskItems,
  renderTaskModal,
  projectSection,
  renderProjectTab,
  openProjectModal,
  openTaskModal,
  closeModal,
};
