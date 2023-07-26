import {
  openProjectModal,
  openTaskModal,
  renderByCategory,
} from "../components/componentsRenderer";
import { clearSelectedProject } from "./utils";
import { renderSelectedProject } from "../components/tabNavigation";

import { hasDynamicID, hasPersistentID } from "./utils";

const content = document.querySelector("#content");

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
      clearSelectedProject();
      renderByCategory(event.target.id);
      //* SortyTaskByCategory()
    } else if (hasDynamicID(event.target)) {
      // selectProjectArray(event.target.id);
      renderSelectedProject(event.target.id);

      //? function that tells NEW TASK what object has been selected
    }
  });
};

export { eventDelegation };
