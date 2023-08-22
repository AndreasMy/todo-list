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
