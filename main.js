// html elements
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// Edit elements
let editElement; // Represents the item being edited
let editFlag = false; // Specifies whether it is in edit mode
let editID = ""; // unique id

// call addItem function when form is submitted
form.addEventListener("submit", addItem);
// Call clearItems function when clear button is clicked
clearBtn.addEventListener("click", clearItems);
// call setupItems function when the page loads
window.addEventListener("DOMContentLoaded", setupItems);
//! functions
function addItem(e) {
  e.preventDefault();
  const value = grocery.value; // Get input value of input
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id"); // creates a new data ID
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    // console.log(element);
    element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
                <button class="edit-btn" type="button">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="delete-btn" type="button">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
    `;

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    list.appendChild(element);
    // alert
    displayAlert("Added Successfully", "success");
    // show container
    container.classList.add("show-container");
    // localStorage adding
    addToLocalStorage(id, value);
    // clear content
    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Value changed", "success");
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("Please enter a value.", "danger");
  }
}

// alert function
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  console.log(alert);
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}
// clearing
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}
// deleting process
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //   console.log(element);
  const id = element.dataset.id; // localStorage kullanılacak

  list.removeChild(element);

  if (list.children.length == 0) {
    container.classList.remove("show-container");
  }
  displayAlert("Product removed", "danger");

  // remove from local storage 
  removeFromLocalStorage(id);
}
// arrange function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  //   console.log(editElement);
  // fill the form value with the text of the edited item
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id; // arranged element id
  submitBtn.textContent = "edit";
}
// clear the list
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item); // remove every elements from the list
    });
  }
  container.classList.remove("show-container");
  displayAlert("List Cleared", "danger");
  setBackToDefault();
}
//! localStorage işlemleri
// Adding items to local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

// Retrieving data from localStorage
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
}
function editLocalStorage(id, value) {}

function setupItems() {
  let items = getLocalStorage();
}