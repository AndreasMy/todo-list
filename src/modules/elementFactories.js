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

export { divFactory, buttonFactory, textFactory, navFactory };
