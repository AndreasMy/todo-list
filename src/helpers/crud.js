import { checkIfStatic } from "./utils";
import { selectedProjectID } from "./utils";
import { retrieveArray } from "../data/localStorage";

const projects =  retrieveArray("projectArray")
const tasks = retrieveArray("taskArray")
const completed = [];
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

//* Create array for tabs
function createProjectArray(arrayName) {
  const newArray = [];

  return {
    [arrayName]: newArray,
    // Other methods
  };
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

  tasks.push(
    taskFactory(
      "Task 1",
      "Description for Task 1",
      "Normal",
      "2023-08-15",
      false,
      true
    ),
    taskFactory(
      "Task 2",
      "Description for Task 2",
      "Normal",
      "2023-08-16",
      false,
      true
    )
  );

  tasks.push(
    taskFactory("Yay", "It's working!", "High", "2023-08-16", false, true)
  );

  projects.push(project);
  projects.push(anotherProject);
}
// defaultProject();

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
      "2023-08-15",
      true,
      false
    ),
    taskFactory(
      "Project header",
      "Make project tab selection change header",
      "Low",
      "2023-08-23",
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
    ),
    taskFactory(
      "Take the dog for a walk",
      "Bring bags",
      "Low",
      "2023-08-13",
      true,
      false
    )
  );
}

// defaultTasks();


export {
  tasks,
  projects,
  taskFactory,
  projectFactory,
  filteredArrays,
  getStaticBtns,
  createProjectArray,
  completed,

};
