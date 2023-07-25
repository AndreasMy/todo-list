import {
  textFactory,
  divFactory,
  buttonFactory,
  navFactory,
} from "../modules/elementFactories";
import { renderTaskItems } from "./taskItems";
import { projects } from "../modules/crud";
import { selectProjectArray, removeElements } from "./componentsRenderer";


function projectSection() {
  const sidebar = document.querySelector("aside");

  //* Projects section
  const projectContainer = divFactory("div", "project-container");
  const projectContentContainer = divFactory(
    "div",
    "project-content-container"
  );
  const projectHeader = textFactory("h3", "project-header", "Projects");
  const addProjectBtn = buttonFactory(
    "add-project-btn",
    "addProjectBtn",
    "Add Project +"
  );
  /*   const navList = navFactory(`${projects.length}`);
  console.log(navList) */

  sidebar.appendChild(projectContainer);
  projectContainer.appendChild(projectHeader);
  projectContainer.appendChild(projectContentContainer);
  projectContainer.appendChild(addProjectBtn);
}

function projectTabFactory(projects) {
  const elements = projects.map((project) => {
    const tabItem = buttonFactory(
      "project-tab",
      `${project.id}`,
      "project-tab"
    );
    tabItem.textContent = `${project.title}`;
    return tabItem;
  });

  return {
    elements: elements,
  };
}

function renderProjectTab() {
  const tabElements = projectTabFactory(projects);
  const navList = document.createElement("ul");
  const projetContainer = document.querySelector(".project-content-container");

  tabElements.elements.forEach((element) => {
    const li = document.createElement("li");

    li.appendChild(element);
    navList.appendChild(li);
    projetContainer.appendChild(navList);
  });
}

function renderSelectedProject(targetID) {
  const getTargetID = targetID
  const projectArray = selectProjectArray(getTargetID);
  removeElements(".app-content")
  renderTaskItems(projectArray)
}

export { projectSection, projectTabFactory, renderProjectTab, renderSelectedProject };
