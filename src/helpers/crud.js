import { checkIfStatic } from "./utils";
import { selectedProjectID } from "./utils";
import {
  retrieveArray,
  storeArray,
  storeUniqueArray,
  retrieveTabArrays,
} from "../data/localStorage";

const projects = retrieveArray("projectArray");
const tasks = retrieveArray("taskArray");
const completed = [];
console.log("Projects Array:", projects);
console.log(tasks);

function distributeTabArrays() {
  const retrievedArrays = retrieveTabArrays();
  const projectArray = retrievedArrays.projectArray;
  const tabArray = retrievedArrays.tabArray;

  const concatenatedArray = projectArray.concat(tabArray);

  return {
    projectArray,
    tabArray,
    concatenatedArray,
  };
}

//* Todo factory
const taskFactory = (
  title,
  description,
  priority,
  date,
  isGeneralTask,
  isProjectTask
) => {
  const projectID = selectedProjectID;
  const taskID = generateObjID(title, "task");
  const task = {
    title,
    description,
    priority,
    date,
    id: taskID,
    tabID: projectID,
    isGeneralTask,
    isProjectTask,
  };
  return task;
};

//* Project factory
const projectFactory = (title, description, isStatic, isTaskStorageEnabled) => {
  const tabID = generateObjID(title, "tab");
  const tab = {
    id: tabID,
    title,
    description,
    isStatic,
    isTaskStorageEnabled,
  };
  return tab;
};

function generateObjID(title, type) {
  const formattedName = title.toLowerCase().replace(/\s+/g, "-");
  const camelCaseName = formattedName.replace(/-([a-z])/g, (match, letter) =>
    letter.toUpperCase()
  );

  return `${type}${camelCaseName}`;
}

function createStaticTabs() {
  const tabs = {
    inbox: projectFactory("Inbox", "All tasks", true, true),
    today: projectFactory("Today", "today's tasks", true, false),
    week: projectFactory("Week", "This week's tasks", true, false),
    completed: projectFactory("Completed", "Completed tasks", true, false),
  };

  if (projects.length === 0) {
    projects.push(tabs.inbox, tabs.today, tabs.week, tabs.completed);
  }

  const staticTabs = [tabs.inbox, tabs.today, tabs.week, tabs.completed];
 // storeUniqueArray("tabArray", staticTabs);

  console.log(projects);
};
// localStorage.clear();

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

export {
  tasks,
  taskFactory,
  projectFactory,
  filteredArrays,
  getStaticBtns,
  completed,
  projects,
};
