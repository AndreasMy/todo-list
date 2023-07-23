//? Export to index.js a tabSelection function with a default setting
//? This module handles button clicks globally???

import { removeTask, renderTaskItems } from "./crud";

const content = document.querySelector("#content");

const eventDelegation = (index) => {
  content.addEventListener("click", (event) => {
    if (event.target.matches(`.cpl-btn-${index}`)) {
      removeTask(index);
    }
  });
};

export { eventDelegation };
