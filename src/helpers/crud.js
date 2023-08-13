import { filter } from "lodash";
import { checkIfStatic, findTabArray } from "./utils";

const projects = [];
const tasks = [];
console.log(projects);
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
  const taskID = generateObjID(title, "task");
  const task = {
    title,
    description,
    priority,
    date,
    id: taskID,
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

//? Most of these should be called in a single function
//? With the name populateDefaultLD
(function createStaticTabs() {
  const tabs = {
    inbox: projectFactory("Inbox", "All tasks", true, true),
    today: projectFactory("Today", "today's tasks", true, false),
    week: projectFactory("Week", "This week's tasks", true, false),
    completed: projectFactory("Completed", "Completed tasks", true, false),
  };

  projects.push(tabs.inbox, tabs.today, tabs.week, tabs.completed);
  console.log(projects);
})();

function defaultProject() {
  const project = projectFactory("Trying", "To make it work", false, true);
  const anotherProject = projectFactory(
    "Trying Harder",
    "To make it is work",
    false,
    true
  );

  project.taskArray.push(
    taskFactory("Task 1", "Description for Task 1", "Normal"),
    taskFactory("Task 2", "Description for Task 2", "Normal")
  );

  anotherProject.taskArray.push(taskFactory("Yay", "It's working!", "High"));

  projects.push(project);
  projects.push(anotherProject);
}
//defaultProject();

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

function defaultTasks() {
  tasks.push(
    taskFactory(
      "Project tab",
      "Make project tab btns render the content page",
      "Normal",
      "2023-08-14",
      true,
      false
    ),
    taskFactory(
      "Project header",
      "Make project tab selection change header",
      "Low",
      "2023-08-13",
      true,
      false
    ),
    taskFactory(
      "Task modal context awareness",
      "Modal automatiaclly detects the selected projects",
      "High",
      "2023-08-13",
      true,
      false
    )
  );
}

defaultTasks();

function storeArray(array) {
  localStorage.setItem("projectsArray", JSON.stringify(array));
  console.log(localStorage);
}

function retrieveArray() {
  const jsonString = localStorage.getItem("projectsArray");
  const retrievedArray = JSON.parse(jsonString) || [];

  console.log("Retrieved from Local Storage:");
  console.log(retrievedArray);
}

export {
  taskFactory,
  projectFactory,
  projects,
  filteredArrays,
  getStaticBtns,
  storeArray,
  retrieveArray,
  tasks,
};
