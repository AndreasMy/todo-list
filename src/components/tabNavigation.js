import {  renderTaskItems } from "./taskItems";

import {
  selectProjectArray,
  setSelectedProject,
  removeElements,
  selectTabTitle,
  checkIfStatic
} from "../modules/utils";

function renderTabHeader(targetID) {
  const tabTitle = selectTabTitle(targetID);
  console.log("Tab Title:", tabTitle);
}

function renderTabContent(targetID) {
  const projectArray = selectProjectArray(targetID);
  setSelectedProject(targetID);
  console.log(projectArray);
  console.log(targetID)

  removeElements(".app-content");
  renderTabHeader(targetID);
  if (!checkIfStatic(targetID)) {
    renderTaskItems(projectArray);
    console.log("working")
  } else {
    console.log("not working")

  }
}

export { renderTabContent };


