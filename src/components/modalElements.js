import {
  textFactory,
  divFactory,
  buttonFactory,
  labelFactory,
  inputFactory,
  radioFactyory,
  dateFactory,
  navFactory,
  selectorFactory,
} from "../helpers/elementFactories";

import { closeModal } from "../data/modalData";
import { targetTabArray } from "../data/tabData";
import { projects } from "../helpers/crud";
import { selectTabTitle } from "../helpers/utils";

targetTabArray(projects);
function renderTaskModal(
  headerText,
  labelFor,
  inputLabel,
  description,
  onsubmitHandler
) {
  //* Containers
  const modalContainer = divFactory("div", "modal-container");
  const modalBackground = divFactory("div", "modal-background");
  const modalCard = divFactory("div", "modal-card");
  const inputWrapper = divFactory("div", "input-wrapper");
  const modalBtnWrapper = divFactory("div", "modal-btn-wrapper");

  //* Header
  const modalHeader = textFactory("h3", "modal-header", headerText);

  //* Inputs
  const labelTaskName = labelFactory(labelFor, inputLabel);
  const inputTaskName = inputFactory(
    "input",
    labelFor,
    labelFor,
    "Add a task..."
  );

  const labelDescription = labelFactory(description, "Description:");
  const inputDescription = inputFactory(
    "textarea",
    description,
    description,
    "Add a description..."
  );
  inputDescription.setAttribute("rows", "5");
  inputDescription.setAttribute("cols", "50");

  //* Buttons
  const addBtn = buttonFactory("add-btn", "submitBtn", "Add");
  const cancelBtn = buttonFactory("cancel-btn", "cancelBtn", "Cancel");

  //* Appending elements
  const content = document.querySelector("#content");

  modalContainer.appendChild(modalCard);
  modalContainer.appendChild(modalBackground);
  modalCard.appendChild(modalHeader);
  modalCard.appendChild(inputWrapper);

  inputWrapper.appendChild(labelTaskName);
  inputWrapper.appendChild(inputTaskName);
  inputWrapper.appendChild(labelDescription);
  inputWrapper.appendChild(inputDescription);

  modalCard.appendChild(modalBtnWrapper);
  modalBtnWrapper.appendChild(cancelBtn);
  modalBtnWrapper.appendChild(addBtn);

  content.appendChild(modalContainer);

  //* Event listeners
  const modalBg = document.querySelector(".modal-background");
  const modalCancel = document.querySelector("#cancelBtn");
  const modalConfirm = document.querySelector("#submitBtn");

  modalBg.addEventListener("click", closeModal);
  modalCancel.addEventListener("click", closeModal);
  modalConfirm.addEventListener("click", onsubmitHandler);
}

function modalProjectMenu(targetID) {
  const inputWrapper = document.querySelector(".input-wrapper");
  const menuWrapper = divFactory("div", "menu-wrapper");
  const menuLabel = labelFactory(
    "taskDestination",
    "Select category or project:"
  );
  selectTabTitle(targetID);
  const select = selectorFactory("taskDestination");

  inputWrapper.appendChild(menuLabel);
  inputWrapper.appendChild(select);

  // autofocus logic here?
  // Set autofocus logic after appending the select element
  selectTabTitle(targetID); // This sets the selected tab title

  // Check if the currently focused element is the select element
  if (document.activeElement === select) {
    select.focus(); // Set focus to the select element if it's not already focused
  }
  inputWrapper.appendChild(menuWrapper);
}

function modalDate() {
  const inputWrapper = document.querySelector(".input-wrapper");
  const dateWrapper = divFactory("div", "date-wrapper");
  const datePickerLabel = labelFactory("dueDate", "Select Due Date");
  const datePicker = dateFactory();

  dateWrapper.appendChild(datePickerLabel);
  dateWrapper.appendChild(datePicker);
  inputWrapper.appendChild(dateWrapper);
}

function modalPriority() {
  const inputWrapper = document.querySelector(".input-wrapper");

  const radioHeader = labelFactory("", "Select Priority");
  const radioContainer = divFactory("div", "radio-container");
  const radioBtnContainers = navFactory(3);
  radioBtnContainers.classList.add("radio-btn-wrapper");

  const priorityOBJ = [
    {
      label: () => labelFactory("priorityLow", "Low"),
      input: () => radioFactyory("priorityLow", "priority", "Low"),
    },
    {
      label: () => labelFactory("priorityNormal", "Normal"),
      input: () => {
        const input = radioFactyory("priorityNormal", "priority", "Normal");
        input.checked = true;
        return input;
      },
    },
    {
      label: () => labelFactory("priorityHigh", "High"),
      input: () => radioFactyory("priorityHigh", "priority", "High"),
    },
  ];

  //* Append Labels and Radio btns to <li>
  radioBtnContainers.querySelectorAll("li").forEach((element, index) => {
    element.classList.add("radio-btn-container");
    element.appendChild(priorityOBJ[index].label());
    element.appendChild(priorityOBJ[index].input());
  });

  inputWrapper.appendChild(radioHeader);
  radioContainer.appendChild(radioBtnContainers);
  inputWrapper.appendChild(radioContainer);
}

export { renderTaskModal, modalPriority, modalDate, modalProjectMenu };
