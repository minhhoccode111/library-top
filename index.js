"use strict";
console.log("hello world from html");

const wrapper = document.querySelector(".wrapper");
const plusButton = document.querySelector(".add-button");
const formContainer = document.querySelector(".form-container");
const haveReadButton = document.querySelector(".switchOnAdding");
const addButton = document.querySelector(".addOnAdding");
const cancelButton = document.querySelector(".cancelOnAdding");
const titleInput = document.querySelector(".titleOnAdding");
const authorInput = document.querySelector(".authorOnAdding");
const totalInput = document.querySelector(".total-pagesOnAdding");
const completedInput = document.querySelector(".completed-pagesOnAdding");
const warnText = document.querySelector(".warnOnAdding");

plusButton.onclick = () => formContainer.classList.remove("none");
cancelButton.onclick = () => formContainer.classList.add("none");
haveReadButton.onclick = () => (completedInput.value = totalInput.value);
completedInput.onkeyup = checkCompletedPages; //check to make sure the pages you've read would not be higher than the book's pages
completedInput.onchange = checkCompletedPages; // ot check if you didn't fill the book's pages first
addButton.onclick = handleAddButton;

let myLibrary = [];
let book;

function handleAddButton(e) {
  if (
    titleInput.value === "" ||
    authorInput.value === "" ||
    totalInput.value == "" ||
    completedInput.value == ""
  ) {
    warnText.classList.remove("none"); // show warn text
    return; //do nothing when we have an empty field
  }
  warnText.classList.add("none"); //remove warn text
  book = new Book(
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value
  );
  myLibrary.push(book);
  console.log(myLibrary);
  formContainer.classList.add("none");
  resetBookForm();
  return myLibrary;
}

function Book(title, author, total, completed) {
  this.title = title;
  this.author = author;
  this.total = total;
  this.completed = completed;
  showBooks(title, author, total, completed);
  //the constructor
}

function resetBookForm() {
  [
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value,
  ] = ["", "", "", ""];
}

function showBooks(a, b, c, d) {
  const newBook = document.createElement("div");
  newBook.classList.add("book-container");
  const options = document.createElement("div");
  options.classList.add("options");
  newBook.appendChild(options);
  const content = document.createElement("div");
  content.classList.add("content");
  newBook.appendChild(content);
  const pagesController = document.createElement("div");
  pagesController.classList.add("pages-controller");
  newBook.appendChild(pagesController);
  const pagesCount = document.createElement("div");
  pagesCount.classList.add("pages-count");
  newBook.appendChild(pagesCount);
  // options childs
  const optionsEditButton = document.createElement("button");
  optionsEditButton.classList.add("button", "green-bg", "button-edit");
  optionsEditButton.innerHTML = "Edit";
  options.appendChild(optionsEditButton);
  const optionsRemoveButton = document.createElement("button");
  optionsRemoveButton.classList.add("button", "red-bg", "button-remove");
  optionsRemoveButton.innerHTML = "Remove";
  options.appendChild(optionsRemoveButton);
  // content childs
  const contentTitle = document.createElement("h2");
  contentTitle.classList.add("title");
  contentTitle.innerHTML = `${a}`;
  content.appendChild(contentTitle);
  const contentAuthor = document.createElement("h3");
  contentAuthor.classList.add("author");
  contentAuthor.innerHTML = `${b}`;
  content.appendChild(contentAuthor);
  // pages-controller childs
  const pagesControllerMinusButton = document.createElement("button");
  pagesControllerMinusButton.classList.add("button", "minus-gb");
  pagesControllerMinusButton.innerHTML = `-`;
  pagesController.appendChild(pagesControllerMinusButton);
  const pagesControllerCheckButton = document.createElement("button");
  pagesControllerCheckButton.classList.add("button", "check-gb");
  pagesControllerCheckButton.innerHTML = `✓`;
  pagesController.appendChild(pagesControllerCheckButton);
  const pagesControllerPlusButton = document.createElement("button");
  pagesControllerPlusButton.classList.add("button", "plus-gb");
  pagesControllerPlusButton.innerHTML = `+`;
  pagesController.appendChild(pagesControllerPlusButton);
  // pages-count childs
  const pagesCountCompleted = document.createElement("h2");
  pagesCountCompleted.classList.add("completed");
  pagesCountCompleted.innerHTML = `${d}`;
  pagesCount.appendChild(pagesCountCompleted);
  const pagesCountSeperator = document.createElement("span");
  pagesCountSeperator.classList.add("seperator");
  pagesCountSeperator.innerHTML = `|`;
  pagesCount.appendChild(pagesCountSeperator);
  const pagesCountTotal = document.createElement("h2");
  pagesCountTotal.classList.add("total");
  pagesCountTotal.innerHTML = `${c}`;
  pagesCount.appendChild(pagesCountTotal);
  // asdasd
  // newBook.innerHTML = `
  // <div class="options">
  // <button class="button green-bg button-edit">Edit</button>
  // <button class="button red-bg button-remove">Remove</button>
  // </div>
  // <div class="content">
  // <h2 class="title">${a}</h2>
  // <h3 class="author">${b}</h3>
  // </div>
  // <div class="pages-controller">
  // <button class="button minus-gb">-</button>
  // <button class="button check-gb" style="">✓</button>
  // <button class="button plus-gb">+</button>
  // </div>
  // <div class="pages-count">
  // <h2 class="completed">${d}</h2>
  // <span class="separator">|</span>
  // <h2 class="total">${c}</h2>
  // </div>
  // `;
  wrapper.appendChild(newBook);
}

function checkCompletedPages() {
  let a = Number(totalInput.value);
  let b = Number(completedInput.value);
  if (a == "" || b > a) {
    completedInput.value = totalInput.value;
    return;
  }
}
