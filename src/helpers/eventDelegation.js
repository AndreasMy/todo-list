import { openModal } from "../data/modalData";
import { elementIsTab, selectObjectByID, setSelectedProject } from "./utils";
import { removeTask, createTabRenderer } from "../components/tabNavigation";


const content = document.querySelector("#content");
const modal = openModal();

const eventDelegation = () => {
  content.addEventListener("click", (event) => {
    switch (true) {
      case event.target.matches("#newTaskBtn"):
        modal.taskModal();
        break;
      case event.target.matches("#addProjectBtn"):
        modal.projectModal();
        break;
      case event.target.matches(".complete-btn"):
        const taskID = event.target.id;
        removeTask(taskID);
        break;
      case elementIsTab(event.target):
        selectObjectByID(event.target.id);
        setSelectedProject(event.target.id);

        const renderTab = createTabRenderer(event.target.id);
        renderTab(event.target.id);
        break;
    }
  });
};

export { eventDelegation };
