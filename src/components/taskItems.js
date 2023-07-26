import {
  textFactory,
  divFactory,
  buttonFactory,
} from "../modules/elementFactories";
import { tasks } from "../modules/crud";
import { removeTask, removeElements } from "./componentsRenderer";
import { hasPersistentID, hasDynamicID } from "../modules/eventDelegation";

function taskItemFactory(array) {
  const elements = array.map((task, index) => {
    const taskItem = divFactory("div", `task-item`);
    taskItem.classList.add(`item-${index}`);

    const itemTextWrapper = divFactory("div", "text-wrapper");
    const cplBtn = buttonFactory(
      "complete-btn",
      `completeBtn_${index}`,
      "Finish"
    );
    const taskTitle = textFactory("h4", "task-title", `${task.title}`);
    const taskDescription = textFactory(
      "p",
      "task-description",
      `${task.description}`
    );

    taskItem.appendChild(itemTextWrapper);
    taskItem.appendChild(cplBtn);
    itemTextWrapper.appendChild(taskTitle);
    itemTextWrapper.appendChild(taskDescription);

    return taskItem;
  });

  return {
    elements: elements,
  };
}

function renderTaskItems(array) {
  removeElements(".app-content");

  const taskItems = taskItemFactory(array);
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
