import { textFactory, divFactory, buttonFactory } from "../modules/elementFactories";
import { tasks } from "../modules/crud";
import { removeTask } from "./componentsRenderer";
import { hasPersistentID, hasDynamicID} from "../modules/eventDelegation";

function taskItemFactory(tasks) {
  const elements = tasks.map((task, index) => {
    const taskItem = divFactory("div", `task-item`);
    taskItem.classList.add(`item-${index}`);

    const itemTextWrapper = divFactory("div", "text-wrapper");
    const cplBtn = buttonFactory(
      "complete-btn",
      `completeBtn_${index}`,
      "Finish"
    );
    taskItem.appendChild(itemTextWrapper);
    taskItem.appendChild(cplBtn);
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
