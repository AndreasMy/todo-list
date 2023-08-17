

function targetTabArray(projects) {
  const availableForStorage = projects
    .filter((project) => project.isTaskStorageEnabled === true)
    .map((obj) => obj.title);
  console.log(availableForStorage);
  return availableForStorage;
}

export { targetTabArray };
