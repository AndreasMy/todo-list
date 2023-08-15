import { openModal } from "../data/modalData";
import { renderTabContent } from "../components/tabNavigation";
import {
  chosenModal,
  elementIsTab,
  selectTabTitle,
  setSelectedProject,
  checkIfAvailableForStorage,
  selectObjectByID,
  staticTabNav,
  checkIfStatic,
  selectedProjectID,
  taskParamHelper,
  hasPersistentID
} from "./utils";
import { projects } from "./crud";
import { removeTask } from "../components/tabNavigation";

const content = document.querySelector("#content");
const modal = openModal();

const eventDelegation = () => {
  content.addEventListener("click", (event) => {
    //* Open New Task modal
    if (event.target.matches("#newTaskBtn")) {
      modal.taskModal();
      //* Open New Project modal
    } else if (event.target.matches("#addProjectBtn")) {
      modal.projectModal();
    } else if (event.target.matches(".complete-btn")) {
      const taskID = event.target.id;
      console.log(taskID);
      removeTask(taskID);
    } else if (elementIsTab(event.target)) {

      taskParamHelper(event.target.id)
      selectObjectByID(event.target.id);
      taskParamHelper(event.target.id)
      setSelectedProject(event.target.id);
      console.log(selectedProjectID);
      renderTabContent(event.target.id);
    }
  });
};

export { eventDelegation };
