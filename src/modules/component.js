//! This module contains factory functions that creates the following DOM components:
//* 0.0: Updating the content containder
//* 1.0: Project buttons
//* 1.1 :Project tabs and their contents
//* 2.0: Independent tasks

import { tasks, removeTask } from "./crud";
import { divFactory, buttonFactory, textFactory } from "./elementFactories";

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

export { taskItemFactory, renderTaskItems };
