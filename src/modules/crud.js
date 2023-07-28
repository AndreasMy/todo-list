const tasks = [];
const projects = [];
const staticTabs = [];
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
  return `tab-${formattedName}`;
}

function defaultTasks() {
  tasks.push(
    taskFactory("Project tab", "Make project tab btns render the content page"),
    taskFactory("Project header", "Make project tab selection change header"),
    taskFactory(
      "Task modal context awareness",
      "Modal automatiaclly detects the selected projects"
    )
  );
}
defaultTasks();

(function createStaticTabs() {
  const tabs = {
    general: projectFactory("General", "All tasks", true),
    today: projectFactory("Today", "today's tasks", true),
    week: projectFactory("Week", "This week's tasks", true),
    completed: projectFactory("Completed", "Completed tasks", true),
  };

  staticTabs.push(tabs.general, tabs.today, tabs.week, tabs.completed);
  staticTabs.forEach((tab) => {
    delete tab.taskArray;
  });

  console.log(staticTabs);
})();

function defaultProject() {
  const project = projectFactory("Trying", "To make it work", false);
  const anotherProject = projectFactory("Trying Harder", "To make it is work");

  project.taskArray.push(
    taskFactory("Task 1", "Description for Task 1"),
    taskFactory("Task 2", "Description for Task 2")
  );

  anotherProject.taskArray.push(taskFactory("Yay", "It's working!"));

  projects.push(project);
  projects.push(anotherProject);
}
defaultProject();

export { taskFactory, projectFactory, tasks, projects, staticTabs };
