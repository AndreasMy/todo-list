import {
  textFactory,
  divFactory,
  buttonFactory,
} from "../modules/elementFactories";

import { projects } from "../modules/crud";

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

  sidebar.appendChild(projectContainer);
  projectContainer.appendChild(projectHeader);
  projectContainer.appendChild(projectContentContainer);
  projectContainer.appendChild(addProjectBtn);
}

function projectTabFactory(projects) {
  const elements = projects.map((project) => {
    const tabItem = divFactory("div", "project-tab");
    tabItem.setAttribute("id", `${project.id}`);

    const tabName = textFactory("h3", "tab-name", `${project.title}`);

    tabItem.appendChild(tabName);
    return tabItem;
  });

  return {
    elements: elements,
  };
}

function renderProjectTab() {
  const tabElements = projectTabFactory(projects);
  const projectContentContainer = document.querySelector(
    ".project-content-container"
  );
  console.log(tabElements.elements);
  tabElements.elements.forEach((element) => {
    projectContentContainer.appendChild(element);
  });
}

export { projectSection, projectTabFactory, renderProjectTab };
