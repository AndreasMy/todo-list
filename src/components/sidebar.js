import {
  textFactory,
  divFactory,
  buttonFactory,
} from "../modules/elementFactories";

import { projects, staticTabs } from "../modules/crud";

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

function projectTabFactory(tabArray) {
  const elements = tabArray.map((project) => {
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

function renderProjectTab(tabArray, targetClass) {
  const tabElements = projectTabFactory(tabArray);
  const navList = document.createElement("ul");
  const projetContainer = document.querySelector(targetClass);

  tabElements.elements.forEach((element) => {
    const li = document.createElement("li");
    li.appendChild(element);
    navList.appendChild(li);
    projetContainer.appendChild(navList);
  });
}




export { projectSection, projectTabFactory, renderProjectTab };
