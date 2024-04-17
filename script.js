// === selectors ===

const todoNameInput = document.querySelector(".todo-name-input");
const todoMobileInput = document.querySelector(".todo-mobile-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const selectBox = document.querySelector(".type-todo");
const filterOption = document.querySelector(".filter-todo");
// === eventListers ===
todoButton.addEventListener("click", addItem);
todoList.addEventListener("click", deleteItem);
filterOption.addEventListener("click", filterContacts);
document.addEventListener("DOMContentLoaded", getContacts);
// === functions ===
function addItem(event) {
  event.preventDefault();
  // console.log(event);
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.classList.add(selectBox.options[selectBox.selectedIndex].value);

  // === create li ===
  const newItem = document.createElement("li");
  const nameSpan = document.createElement("span");
  const mobileSpan = document.createElement("span");
  const typeSpan = document.createElement("span");

  nameSpan.innerHTML = todoNameInput.value;
  mobileSpan.innerHTML = todoMobileInput.value;
  typeSpan.innerHTML = selectBox.options[selectBox.selectedIndex].innerText;
  newItem.appendChild(nameSpan);
  newItem.appendChild(mobileSpan);
  newItem.appendChild(typeSpan);
  newItem.classList.add("todo-item");
  todoDiv.appendChild(newItem);

  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class = "fas fa-trash"></i>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);
  // === append div to ul ===
  todoList.appendChild(todoDiv);

  saveLocalContact({
    name: todoNameInput.value,
    number: todoMobileInput.value,
    type: selectBox.options[selectBox.selectedIndex].innerText,
  });
  todoMobileInput.value = "";
  todoNameInput.value = "";
  filterOption.style.display = "block";
}

function deleteItem(event) {
  const item = event.target;
  if (item.classList[0] === "trash-btn") {
    const contact = item.parentElement;
    contact.classList.add("fall");
    setTimeout(() => {
      contact.remove();
    }, 2000);
    removeLocalContact(contact);
  }
}

function filterContacts(event) {
  const contacts = todoList.childNodes;
  contacts.forEach(function (contact) {
    switch (event.target.value) {
      case "2":
        contact.style.display = "flex";
        break;

      case "1":
        if (contact.classList.contains("1")) {
          contact.style.display = "flex";
        } else {
          contact.style.display = "none";
        }
        break;

      case "0":
        if (!contact.classList.contains("1")) {
          contact.style.display = "flex";
        } else {
          contact.style.display = "none";
        }
        break;

      default:
        break;
    }
  });
}

function saveLocalContact(contact) {
  let contacts;
  if (localStorage.getItem("contacts") === null) {
    contacts = [];
  } else {
    contacts = JSON.parse(localStorage.getItem("contacts"));
  }
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function removeLocalContact(contact) {
  let contacts;
  if (localStorage.getItem("contacts") === null) {
    contacts = [];
  } else {
    contacts = JSON.parse(localStorage.getItem("contacts"));
  }
  const result = contact.children[0].innerHTML.split("</span>");
  const number = result[0].match(/\d/g).join("");
  const index = contacts.findIndex((item) => item.number === number);
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function getContacts() {
  let contacts;
  if (localStorage.getItem("contacts") === null) {
    contacts = [];
  } else {
    contacts = JSON.parse(localStorage.getItem("contacts"));
  }
  contacts.forEach(function (contact) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.add(selectBox.options[selectBox.selectedIndex].value);

    // === create li ===
    const newItem = document.createElement("li");
    const nameSpan = document.createElement("span");
    const mobileSpan = document.createElement("span");
    const typeSpan = document.createElement("span");

    nameSpan.innerHTML = contact.name;
    mobileSpan.innerHTML = contact.number;
    typeSpan.innerHTML = contact.type;
    newItem.appendChild(nameSpan);
    newItem.appendChild(mobileSpan);
    newItem.appendChild(typeSpan);
    newItem.classList.add("todo-item");
    todoDiv.appendChild(newItem);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class = "fas fa-trash"></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // === append div to ul ===
    todoList.appendChild(todoDiv);

    todoMobileInput.value = "";
    todoNameInput.value = "";
    filterOption.style.display = "block";
  });
}
