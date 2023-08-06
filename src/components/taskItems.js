import {
  textFactory,
  divFactory,
  buttonFactory,
} from "../modules/elementFactories";
import { removeElements } from "../modules/utils";
import { removeTask } from "./componentsRenderer";


//? Array should use retrievedArray as argument
function taskItemFactory(array) {
  const elements = array.map((task, index) => {
    const taskItem = divFactory("div", `task-item`);
    taskItem.classList.add(`item-${index}`);

    const priorityMarker = divFactory("div", "priority-marker");
    //* style the marker in js
    if (task.priority === "Low") {
      priorityMarker.style.backgroundColor = "rgb(71, 138, 69)";
    } else if (task.priority === "Normal") {
      priorityMarker.style.backgroundColor = "rgb(224, 213, 54)";
    } else if (task.priority === "High") {
      priorityMarker.style.backgroundColor = "rgb(207, 50, 50)";
    }

    const leftWrapper = divFactory("div", "left-wrapper");
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

    taskItem.appendChild(leftWrapper);

    leftWrapper.appendChild(priorityMarker);
    leftWrapper.appendChild(itemTextWrapper);
    taskItem.appendChild(cplBtn);
    itemTextWrapper.appendChild(taskTitle);
    itemTextWrapper.appendChild(taskDescription);

    return taskItem;
  });

  return {
    elements: elements,
  };
}

//? Array should use retrievedArray as argument
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

export { renderTaskItems };
