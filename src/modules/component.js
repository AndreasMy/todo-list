//* 0.0: Updating the content containder
//* 1.0: Project buttons
//* 1.1 :Project tabs and their contents
//* 2.0: Independent tasks

import { tasks, removeTask, closeModal, submitEntry } from "./crud";
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

function renderTaskModal(headerText, labelFor, inputLabel, addBtnID, onsubmitHandler ) {
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
  const inputTaskName = inputFactory("input", labelFor, labelFor, "Add a task...");
  const labelDescription = labelFactory("description", "Description:");
  const inputDescription = inputFactory(
    "textarea",
    "description",
    "description",
    "Add a description..."
  );
  inputDescription.setAttribute("rows", "5");
  inputDescription.setAttribute("cols", "50");

  //* Buttons
  const addBtn = buttonFactory("add-btn", addBtnID, "Add");
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
  const modalConfirm = document.querySelector("#addTaskBtn");

  modalBg.addEventListener("click", closeModal);
  modalCancel.addEventListener("click", closeModal);
  modalConfirm.addEventListener("click", onsubmitHandler);
}

function modalTaskSettings() {
  //* date
  //* priority 
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

export { taskItemFactory, renderTaskItems, renderTaskModal, projectSection };
