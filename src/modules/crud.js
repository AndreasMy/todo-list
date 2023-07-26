const tasks = [];
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

//Use
const newProject = projectFactory("project", "it's a project", true)
console.log(newProject)

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

function defaultProject() {
  const project = projectFactory("Trying", "To make it work");

  project.taskArray.push(
    taskFactory("Task 1", "Description for Task 1"),
    taskFactory("Task 2", "Description for Task 2")
  );

  projects.push(project);
}
defaultProject();

export { taskFactory, projectFactory, tasks, projects };
