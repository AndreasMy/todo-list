let selectedProjectID = null;

function selectProjectID(targetID) {
  return (selectedID = targetID);
}

function setSelectedProject(targetID) {
  selectedProjectID = targetID;
}

function clearSelectedProject() {
  selectedProjectID = null;
}

function hasPersistentID(element) {
  const persitentTabIDs = ["completeBtn", "weekBtn", "todayBtn", "generalBtn"];
  return persitentTabIDs.includes(element.id);
}

function hasDynamicID(element) {
  const prefix = "tab-";
  return element.id.startsWith(prefix);
}

function selectProjectArray(targetID) {
  const selectedProject = projects.find((project) => project.id === targetID);
  console.log(selectedProject);
  return selectedProject ? selectedProject.taskArray : false;
}

export {
  selectedProjectID,
  selectProjectID,
  setSelectedProject,
  clearSelectedProject,
  hasPersistentID,
  hasDynamicID,
  selectProjectArray,
};