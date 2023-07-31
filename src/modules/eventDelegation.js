import { openModal, submitObject } from "../components/componentsRenderer";
import { renderTabContent } from "../components/tabNavigation";
import { chosenModal, hasDynamicID } from "./utils";

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
      /*      const selectedTabTitle = selectTabTitle(event.target.id);
      console.log(selectedTabTitle) */
      //? function that tells NEW TASK what object has been selected
    } /* else if (checkIfStatic(element)) {
      handleStaticTabs()
    } */
  });
};

export { eventDelegation };
