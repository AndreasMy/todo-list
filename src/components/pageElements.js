import {
    divFactory,
    buttonFactory,
    textFactory,
    navFactory,
  } from "../helpers/elementFactories";
  import { setCategoryHeader } from "../components/tabNavigation";
  import { projectSection } from "../components/tabElements";
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
    const staticTabContainer = divFactory("div", "static-tab-container")
    const navList = navFactory(4);
  
    //* Sorting btns
    const newTaskBtn = buttonFactory("new-task-btn", "newTaskBtn", "New Task");
  
    content.appendChild(main);
    main.appendChild(appContainer);
    appContainer.appendChild(sidebar);
    appContainer.appendChild(sectionRight);
  
    sidebar.appendChild(tabContainer);
    tabContainer.appendChild(tabHeader);
    tabContainer.appendChild(staticTabContainer)
  
    sectionRight.appendChild(appHeader);
    sectionRight.appendChild(appContent);
    appHeader.appendChild(appHeaderTitleWrapper);
    appHeader.appendChild(appHeaderBtnWrapper);
    appHeaderBtnWrapper.appendChild(newTaskBtn);
  }
  
  function renderPage() {
    renderMain();
    setCategoryHeader("General");
    projectSection();
  }
  
  export { renderPage };
  