import {
  textFactory,
  divFactory,
  buttonFactory,
} from "../helpers/elementFactories";
import { removeElements } from "../helpers/utils";

import { getFormattedDates } from "../data/taskData";
import { tasks } from "../helpers/crud";


//? Array should use retrievedArray as argument
function taskItemFactory(array) {
  const elements = array.map((task, index) => {
    const taskItem = divFactory("div", `task-item`);
    taskItem.classList.add(`item-${index}`);

    const taskContentWrapper = divFactory("div", "task-content");

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
    const cplBtn = buttonFactory("complete-btn", task.id, "Finish");
    const taskTitle = textFactory("h4", "task-title", `${task.title}`);
    const taskDescription = textFactory(
      "p",
      "task-description",
      `${task.description}`
    );

    //* Display due date:
    const dates = getFormattedDates(task.date);
    const dateDisplay = divFactory("span", "date-display");
    const displayDate = textFactory("p", "display-date-txt", `${dates}`);

    taskItem.appendChild(dateDisplay);
    dateDisplay.appendChild(displayDate);
    taskItem.appendChild(taskContentWrapper);

    taskContentWrapper.appendChild(leftWrapper);

    leftWrapper.appendChild(priorityMarker);
    leftWrapper.appendChild(itemTextWrapper);
    taskContentWrapper.appendChild(cplBtn);
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

  taskItems.elements.forEach((element) => {
    appContent.appendChild(element);
  });
}

export { renderTaskItems };
