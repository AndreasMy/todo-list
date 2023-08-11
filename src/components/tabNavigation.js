import { renderTaskItems } from "./taskElements";

import {
  selectProjectArray,
  setSelectedProject,
  removeElements,
  selectTabTitle,
  checkIfStatic,
  selectObjectByID,
  selectProjectID,
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
/*   const objID = selectProjectID(targetID);
  console.log(objID); */

  removeElements(".app-content");
  renderTabHeader(targetID);

  if (!checkIfStatic(targetID)) {
    renderTaskItems(projectArray);
    console.log("working");
  } else {
    console.log("not working");
  }
}

function highlightTab() {
  //code
}

export { renderTabContent, setCategoryHeader };
