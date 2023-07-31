import { filter } from "lodash";
import { checkIfStatic, findTabArray } from "./utils";

const projects = [];
console.log(projects);

//* Todo factory
const taskFactory = (title, description) => {
  return { title, description };
};

//* Project factory
const projectFactory = (title, description, isStatic) => {
  const tabID = generateTabId(title);
  const tab = {
    id: tabID,
    title,
    description,
    taskArray: [],
    isStatic,
  };

  return tab;
};

function generateTabId(title) {
  const formattedName = title.toLowerCase().replace(/\s+/g, "-");

  // Convert the formatted name to camel case
  const camelCaseName = formattedName.replace(/-([a-z])/g, (match, letter) =>
    letter.toUpperCase()
  );

  return `tab${camelCaseName}`;
}

(function createStaticTabs() {
  const tabs = {
    general: projectFactory("General", "All tasks", true),
    today: projectFactory("Today", "today's tasks", true),
    week: projectFactory("Week", "This week's tasks", true),
    completed: projectFactory("Completed", "Completed tasks", true),
  };

  projects.push(tabs.general, tabs.today, tabs.week, tabs.completed);

  console.log(projects);
})();

function defaultProject() {
  const project = projectFactory("Trying", "To make it work", false);
  const anotherProject = projectFactory(
    "Trying Harder",
    "To make it is work",
    false
  );

  project.taskArray.push(
    taskFactory("Task 1", "Description for Task 1"),
    taskFactory("Task 2", "Description for Task 2")
  );

  anotherProject.taskArray.push(taskFactory("Yay", "It's working!"));

  projects.push(project);
  projects.push(anotherProject);
}
defaultProject();

//TODO, export/import function, store in variable, pass as argument, drink coffee
function getStaticBtns() {
  const filteredBtns = projects.filter((project) => checkIfStatic(project));
  console.log(filteredBtns);
  return filteredBtns;
}

function getDynamicBtns() {
  const filteredBtns = projects.filter((project) => !checkIfStatic(project));
  return filteredBtns;
}
getDynamicBtns();

function filteredArrays() {
  return {
    static: () => getStaticBtns(),
    dynamic: () => getDynamicBtns(),
  };
}

function sortTaskByGeneral() {
  const generalTab = findTabArray("tabgeneral");
  // something something go to bed...
}

function populateStaticTabArrays() {
  projects.forEach((project) => {
    if (project.isStatic) {
      switch (project.title) {
        case "General":
          sortTaskByGeneral();
          break;
      }
    }
  });
}

function defaultTasks() {
  const generalTab = findTabArray("tabgeneral");

  generalTab.push(
    taskFactory("Project tab", "Make project tab btns render the content page"),
    taskFactory("Project header", "Make project tab selection change header"),
    taskFactory(
      "Task modal context awareness",
      "Modal automatiaclly detects the selected projects"
    )
  );
}
defaultTasks();

function storeArray() {
  localStorage.setItem("projectsArray", JSON.stringify(projects));
}

function retrieveArray() {
  const jsonString = localStorage.getItem("projectsArray");
  const retrievedArray = JSON.parse(jsonString);

  console.log(retrievedArray);

}

// storeArray();
// retrieveArray();

export {
  taskFactory,
  projectFactory,
  projects,
  filteredArrays,
  getStaticBtns,
  storeArray,
  retrieveArray,
};
