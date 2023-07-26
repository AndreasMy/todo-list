import { taskItemFactory } from "./taskItems";
import { removeTask } from "./componentsRenderer";
import { selectProjectArray, setSelectedProject, removeElements } from "../modules/utils";

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

function renderSelectedProject(targetID) {
  const getTargetID = targetID;
  const projectArray = selectProjectArray(getTargetID);
  setSelectedProject(targetID);

  removeElements(".app-content");
  renderTaskItems(projectArray);
}

export { renderSelectedProject, renderTaskItems };
