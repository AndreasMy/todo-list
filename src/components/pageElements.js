import {
  divFactory,
  buttonFactory,
  textFactory,
  navFactory,
} from "../helpers/elementFactories";
import { setCategoryHeader } from "./tabNavigation";
import { projectSection } from "./tabElements";
import { projectFactory } from "../helpers/crud";
import { projectTabFactory, renderProjectTab } from "./tabElements";

const content = document.querySelector("#content");

function renderMain() {
  //* Wrappers
  const main = divFactory("main", "mainClass");
  const appContainer = divFactory("div", "app-container");
  const sectionRight = divFactory("div", "section-right");
  const appContent = divFactory("div", "app-content");
  const appHeader = divFactory("div", "app-header");
  const appHeaderBtnWrapper = divFactory("div", "header-btn-wrapper");
  const appHeaderTitleWrapper = divFactory("div", "header-title-wrapper");

  //* Sidebar
  const sidebar = divFactory("aside", "sidebar");
  const tabContainer = divFactory("nav", "tab-container");
  const tabHeader = textFactory("h3", "tab-header", "To Do List");
  const staticTabContainer = divFactory("div", "static-tab-container");

  //* Sorting btns
  const newTaskBtn = buttonFactory("new-task-btn", "newTaskBtn", "New Task");

  content.appendChild(main);
  main.appendChild(appContainer);
  appContainer.appendChild(sidebar);
  appContainer.appendChild(sectionRight);

  sidebar.appendChild(tabContainer);
  tabContainer.appendChild(tabHeader);
  tabContainer.appendChild(staticTabContainer);

  sectionRight.appendChild(appHeader);
  sectionRight.appendChild(appContent);
  appHeader.appendChild(appHeaderTitleWrapper);
  appHeader.appendChild(appHeaderBtnWrapper);
  appHeaderBtnWrapper.appendChild(newTaskBtn);
}

function createStaticTabs() {
  const tabs = {
    inbox: projectFactory("Inbox", "All tasks", true, true),
    today: projectFactory("Today", "today's tasks", true, false),
    week: projectFactory("Week", "This week's tasks", true, false),
    completed: projectFactory("Completed", "Completed tasks", true, false),
  };

  const staticTabs = [tabs.inbox, tabs.today, tabs.week, tabs.completed];
  return staticTabs;
}

function renderStaticTabs() {
  const staticTabs = createStaticTabs();
  renderProjectTab(staticTabs, ".static-tab-container");
}

function renderPage() {
  renderMain();
  setCategoryHeader("General");
  projectSection();
  renderStaticTabs();
}

export { renderPage, createStaticTabs };
