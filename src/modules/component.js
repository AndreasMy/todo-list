//* 0.0: Updating the content containder
//* 1.0: Project buttons
//* 1.1 :Project tabs and their contents
//* 2.0: Independent tasks

import { tasks, removeTask } from "./crud";
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

function renderTaskModal() {
  const modalContainer = divFactory("div", "modal-container");
  const modalBackground = divFactory("div", "modal-background");
  const modalCard = divFactory("div", "modal-card");
  const inputWrapper = divFactory("div", "input-wrapper");

  //* Header
  const modalHeader = textFactory("h3", "modal-header", "Add Task");

  //* Inputs
  const labelTaskName = labelFactory("task", "Task:");
  const inputTaskName = inputFactory("input", "task", "task", "Add a task...");
  const labelDescription = labelFactory("description", "Description:");
  const inputDescription = inputFactory(
    "textarea",
    "description",
    "description",
    "Add a description..."
  );
  inputDescription.setAttribute("rows", "4");
  inputDescription.setAttribute("cols", "50");

  const content = document.querySelector("#content");

  modalContainer.appendChild(modalCard);
  modalContainer.appendChild(modalBackground);
  modalCard.appendChild(modalHeader);
  modalCard.appendChild(inputWrapper);

  inputWrapper.appendChild(labelTaskName);
  inputWrapper.appendChild(inputTaskName);
  inputWrapper.appendChild(labelDescription);
  inputWrapper.appendChild(inputDescription);

  content.appendChild(modalContainer);
}

function renderTaskItems() {
  const taskItems = taskItemFactory(tasks);
  console.log(taskItems);
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

export { taskItemFactory, renderTaskItems, renderTaskModal };
