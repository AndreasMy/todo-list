import {
  textFactory,
  divFactory,
  buttonFactory,
<<<<<<< HEAD:src/components/sidebar.js
} from "../modules/elementFactories";
import { fetchLocalStorage,  } from "../modules/localStorage";

const retrievedArray = fetchLocalStorage();
=======
} from "../helpers/elementFactories";
import { checkIfStatic } from "../helpers/utils";
>>>>>>> main:src/components/tabElements.js

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
    const tabItem = divFactory("div", "project-tab");

    tabItem.setAttribute("id", `${project.id}`);
    tabItem.textContent = `${project.title}`;

    if (!checkIfStatic(project)) {
      const tabRmBtn = buttonFactory("tab-rm-btn", project.id, "X");
      tabItem.appendChild(tabRmBtn);
    }

    return tabItem;
  });

  return {
    elements: elements,
  };
}

function renderProjectTab(tabArray, targetClass) {
  console.log(tabArray)
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
