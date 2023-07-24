import {
  divFactory,
  buttonFactory,
  textFactory,
  navFactory,
} from "./elementFactories";

import { openModal } from "./crud";

const content = document.querySelector("#content");

function renderMain() {
  //* Wrappers
  const main = divFactory("main", "mainClass");
  const appContainer = divFactory("div", "app-container");
  const sectionRight = divFactory("div", "section-right");
  const appContent = divFactory("div", "app-content");
  const appHeader = divFactory("div", "app-header");

  //* Sidebar
  const sidebar = divFactory("aside", "sidebar");
  const tabContainer = divFactory("nav", "tab-container");
  const tabHeader = textFactory("h3", "tab-header", "To Do List");
  const navList = navFactory(4);

  //* Sorting btns
  const newTaskBtn = buttonFactory("new-task-btn", "newTaskBtn", "New Task");
  const generalBtn = buttonFactory("nav-btn", "generalBtn", "General");
  const todayBtn = buttonFactory("nav-btn", "todayBtn", "Today");
  const weekBtn = buttonFactory("nav-btn", "weekBtn", "Week");
  const completeBtn = buttonFactory("nav-btn", "completeBtn", "Completed");
  const navBtns = [generalBtn, todayBtn, weekBtn, completeBtn];

  //* Append Buttons to li elements
  navList.querySelectorAll("li").forEach((element, index) => {
    element.appendChild(navBtns[index]);
  });

  content.appendChild(main);
  main.appendChild(appContainer);
  appContainer.appendChild(sidebar);
  appContainer.appendChild(sectionRight);

  sidebar.appendChild(tabContainer);
  tabContainer.appendChild(tabHeader);
  tabContainer.appendChild(navList);

  sectionRight.appendChild(appHeader);
  sectionRight.appendChild(appContent);
  appHeader.appendChild(newTaskBtn);

  const taskBtn = document.querySelector("#newTaskBtn");
  taskBtn.addEventListener("click", () => {
    openModal();
  });
}

function projectSection() {
  const sidebar = document.querySelector("aside");

  //* Projects section
  const projectContainer = divFactory("div", "project-container");
  const projectHeader = textFactory("h3", "project-header", "Projects");
  const addProjectBtn = buttonFactory(
    "add-project-btn",
    "addProjectBtn",
    "Add Project"
  );

  sidebar.appendChild(projectContainer);
  projectContainer.appendChild(projectHeader);
  projectContainer.appendChild(addProjectBtn);
}

function renderPage() {
  renderMain();
  projectSection();
}

export { renderPage };
