import {
  textFactory,
  divFactory,
  buttonFactory,
  labelFactory,
  inputFactory,
  radioFactyory,
} from "../modules/elementFactories";

import { closeModal } from "./componentsRenderer";

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

function modalPriority() {
  const inputWrapper = document.querySelector(".input-wrapper");

  const radioHeader = labelFactory("", "Select Priority");
  const radioContainer = divFactory("div", "radio-container");
  const labelContainer = divFactory("div", "label-container");
  const radioBtnContainer = divFactory("div", "radio-btns");

  const labelLow = textFactory("p", "priority-low", "Low");
  const priorityLow = radioFactyory("priorityLow", "priority", "Low");

  const labelMedium = textFactory("p", "priority-normal", "Normal");
  const priorityNormal = radioFactyory("priorityNormal", "priority", "Normal");
  priorityNormal.checked = true


  const labelHigh = textFactory("p", "priority-high", "High");
  const priorityHigh = radioFactyory("priorityHigh", "priority", "High");

  inputWrapper.appendChild(radioHeader);

  labelContainer.appendChild(labelLow);
  labelContainer.appendChild(labelMedium);
  labelContainer.appendChild(labelHigh);
  radioContainer.appendChild(labelContainer);

  radioContainer.appendChild(radioBtnContainer);
  radioBtnContainer.appendChild(priorityLow);
  radioBtnContainer.appendChild(priorityNormal);
  radioBtnContainer.appendChild(priorityHigh);

  inputWrapper.appendChild(radioContainer);
}

function modalDueDtate() {}

export { renderTaskModal, modalPriority };
