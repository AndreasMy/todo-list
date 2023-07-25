import {
  openProjectModal,
  openTaskModal,
  renderByCategory,
  selectProjectArray,
  selectProjectID
} from "../components/componentsRenderer";
import { renderSelectedProject } from "../components/sidebar";

const content = document.querySelector("#content");

function hasPersistentID(element) {
  const persitentTabIDs = ["completeBtn", "weekBtn", "todayBtn", "generalBtn"];
  return persitentTabIDs.includes(element.id);
}

function hasDynamicID(element) {
  const prefix = "tab-";
  return element.id.startsWith(prefix);
}


const eventDelegation = () => {
  content.addEventListener("click", (event) => {
    //* Open New Task Button
    if (event.target.matches("#newTaskBtn")) {
      openTaskModal();
      //* Open New Project Button
    } else if (event.target.matches("#addProjectBtn")) {
      openProjectModal();
      //* Sort by tab selection
    } else if (hasPersistentID(event.target)) {
      renderByCategory(event.target.id);
      //* SortyTaskByCategory()
    } else if (hasDynamicID(event.target)) {
      selectProjectArray(event.target.id);
      renderSelectedProject(event.target.id)

      //? function that tells NEW TASK what object has been selected
    }
  });
};

export { eventDelegation, hasPersistentID, hasDynamicID };
