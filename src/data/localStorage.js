import { tasks } from "../helpers/crud";

function storeArray(arrayName, array) {
  localStorage.setItem(arrayName, JSON.stringify(array));
  console.log(localStorage);
}

function retrieveArray(arrayName) {
  const jsonString = localStorage.getItem(arrayName);
  const retrievedArray = JSON.parse(jsonString) || [];

  console.log("Retrieved from Local Storage:");
  console.log(retrievedArray);
  return retrievedArray
}

function populateArray(array) {
    const arrayFromStorage = retrieveArray("taskArray")
    array.push(arrayFromStorage)
}

export { storeArray, retrieveArray, populateArray };
