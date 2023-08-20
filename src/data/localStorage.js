import { projects } from "../helpers/crud";

function storeArray(arrayName, array) {
  localStorage.setItem(arrayName, JSON.stringify(array));
  console.log(localStorage);
}

function storeUniqueArray(arrayName, newArray) {
  const retrievedArray = retrieveArray(arrayName);

  const newTabs = newArray.filter(
    (item) =>
      !retrievedArray.some((existingItem) => existingItem.id === item.id)
  );
  const combinedArray = [...retrievedArray, ...newTabs]
  storeArray(arrayName, combinedArray)
}

function retrieveArray(arrayName) {
  const jsonString = localStorage.getItem(arrayName);
  const retrievedArray = JSON.parse(jsonString) || [];

  console.log("Retrieved from Local Storage:");
  console.log(retrievedArray);
  return retrievedArray;
  
}

function populateArray(array) {
  const arrayFromStorage = retrieveArray("taskArray");
  array.push(arrayFromStorage);
}

export { storeArray, retrieveArray, populateArray, storeUniqueArray };
