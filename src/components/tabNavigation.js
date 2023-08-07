import { renderTaskItems } from "./taskElements";

import {
  selectProjectArray,
  setSelectedProject,
  removeElements,
  selectTabTitle,
  checkIfStatic,
} from "../helpers/utils";
import { textFactory } from "../helpers/elementFactories";

function setCategoryHeader(text) {
  const header = document.querySelector(".header-title-wrapper");
  header.innerHTML = ""; // Clear existing content
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

