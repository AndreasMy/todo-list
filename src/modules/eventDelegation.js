import { renderByCategory, openModal } from "../components/componentsRenderer";
import { clearSelectedProject } from "./utils";
import {
  renderSelectedProject,
  renderStaticTab,
} from "../components/tabNavigation";
import { projects } from "./crud";
import { hasDynamicID, hasPersistentID, checkIfStatic } from "./utils";

const content = document.querySelector("#content");
const modal = openModal();

const eventDelegation = () => {
  content.addEventListener("click", (event) => {
    //* Open New Task Button
    if (event.target.matches("#newTaskBtn")) {
      modal.taskModal();
      //* Open New Project Button
    } else if (event.target.matches("#addProjectBtn")) {
      modal.projectModal();
    } else if (hasDynamicID(event.target)) {
      renderSelectedProject(event.target.id);
      //? function that tells NEW TASK what object has been selected
    }
  });
};

export { eventDelegation };
