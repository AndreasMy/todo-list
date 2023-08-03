import { renderTaskItems } from "./taskItems";

import {
  selectProjectArray,
  setSelectedProject,
  removeElements,
  selectTabTitle,
  checkIfStatic,
} from "../modules/utils";
import { textFactory } from "../modules/elementFactories";

function setCategoryHeader(text) {
  const header = document.querySelector(".header-title-wrapper");
  header.innerHTML = ""; 
  header.appendChild(textFactory("h2", "app-header-title", text));
}

function renderTabHeader(targetID) {
  const tabTitle = selectTabTitle(targetID);
  setCategoryHeader(tabTitle);
  console.log("Tab Title:", tabTitle);
}

function renderTabContent(targetID) {
  const projectArray = selectProjectArray(targetID);
  setSelectedProject(targetID);
  console.log(projectArray);
  console.log(targetID);

  removeElements(".app-content");
  renderTabHeader(targetID);

  if (!checkIfStatic(targetID)) {
    renderTaskItems(projectArray);
    console.log("working");
  } else {
    console.log("not working");
  }
}

export { renderTabContent, setCategoryHeader };
