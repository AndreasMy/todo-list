import { openProjectModal, openTaskModal } from "./crud";

const content = document.querySelector("#content");

const eventDelegation = () => {
  content.addEventListener("click", (event) => {
    if (event.target.matches("#newTaskBtn")) {
      openTaskModal();
    } else if (event.target.matches("#addProjectBtn")) {
      openProjectModal();
    }
  });
};

export { eventDelegation };
