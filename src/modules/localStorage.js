import { projects } from "./crud";

let localData = [];


function copyArray() {
  const retrievedArray = fetchLocalStorage();
  const localData = retrievedArray.length === 0 ? [...projects] : [...retrievedArray];
  
  console.log("localData array:", localData);
  return localData;
}

function storeArray() {
  const localData = copyArray();
  localStorage.setItem("projectsArray", JSON.stringify(localData));
  console.log("in local storage:", localStorage);
}

function fetchLocalStorage() {
  const jsonString = localStorage.getItem("projectsArray");
  const retrievedArray = JSON.parse(jsonString) || [];

  console.log("Retrieved from Local Storage:", retrievedArray);
  return retrievedArray;
}

export { storeArray, fetchLocalStorage, copyArray, localData, };

