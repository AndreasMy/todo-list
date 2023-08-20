const { format } = require("date-fns");
import { targetTabArray } from "../data/tabData";
import { projects } from "./crud";
import { selectTabTitle, selectedProjectID } from "./utils";

function divFactory(elemType, className) {
  const element = document.createElement(elemType);
  element.classList.add(className);

  return element;
}

function buttonFactory(className, idName, buttonText) {
  const button = document.createElement("button");
  button.classList.add(className);
  button.setAttribute("id", idName);
  button.textContent = buttonText;

  return button;
}

function textFactory(type, className, content) {
  const text = document.createElement(type);
  text.classList.add(className);
  text.textContent = content;

  return text;
}

function navFactory(num) {
  const ul = document.createElement("ul");
  for (let i = 0; i < num; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);
  }
  return ul;
}

function labelFactory(labelFor, labelText) {
  const label = document.createElement("label");
  label.setAttribute("for", labelFor);
  label.textContent = labelText;

  return label;
}

function inputFactory(inputType, id, inputName, placeholder) {
  const input = document.createElement(inputType);
  input.id = id;
  input.name = inputName;
  input.placeholder = placeholder;

  return input;
}

function radioFactyory(inputID, inputName, inputValue) {
  const input = document.createElement("input");
  input.type = "radio";
  input.id = inputID;
  input.name = inputName;
  input.value = inputValue;
  return input;
}

function dateFactory() {
  //* Get today's date
  // Get the current date in your local time zone
  const now = new Date();
  const today = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  )
    .toISOString()
    .split("T")[0];

  const date = document.createElement("input");
  date.type = "date";
  date.id = "dueDate";
  date.name = "due-date";
  date.value = today;

  return date;
}

function selectorFactory(id) {
  const menuItems = targetTabArray(projects);
  const select = document.createElement("select");

  menuItems.forEach((item) => {
    const menuItem = optionsFactory(item);
    select.appendChild(menuItem);
  });

  document.activeElement.blur();
  select.setAttribute("id", id);
  return select;
}

function optionsFactory(value) {
  const option = document.createElement("option");
  option.textContent = value;
  option.value = value;
  return option;
}

export {
  labelFactory,
  inputFactory,
  divFactory,
  buttonFactory,
  textFactory,
  navFactory,
  radioFactyory,
  dateFactory,
  optionsFactory,
  selectorFactory,
};
