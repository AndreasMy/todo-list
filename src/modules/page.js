import {
  divFactory,
  buttonFactory,
  textFactory,
  navFactory,
} from "./elementFactories";

const content = document.querySelector("#content");

function renderMain() {
  //* Wrappers
  const main = divFactory("main", "mainClass");
  const appContainer = divFactory("div", "app-container");
  const appContent = divFactory("div", "app-content");

  //* Sidebar
  const sidebar = divFactory("aside", "sidebar");
  const tabContainer = divFactory("nav", "tab-container");
  const tabHeader = textFactory("h3", "tab-header", "To Do List");
  const navList = navFactory(4);

  //* Sorting btns
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

  sidebar.appendChild(tabContainer);
  tabContainer.appendChild(tabHeader);
  tabContainer.appendChild(navList);

  appContainer.appendChild(appContent);
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

//? Should I wrap pages in an object?
function updateContent() {}

export { renderPage };
