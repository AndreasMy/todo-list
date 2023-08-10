import { openModal } from "../data/modalData";
import { renderTabContent } from "../components/tabNavigation";
import {
  chosenModal,
  hasDynamicID,
  selectTabTitle,
  setSelectedProject,
} from "./utils";
import { projects } from "./crud";

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
      renderTabContent(event.target.id);
    }
  });
};

export { eventDelegation };
