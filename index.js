"use strict";
console.log("hello world from html");

const wrapper = document.querySelector(".wrapper");
const plusButton = document.querySelector(".add-button");
const formContainer = document.querySelector(".form-container");
const haveReadButton = document.querySelector(".switch");
const addButton = document.querySelector(".add");
const cancelButton = document.querySelector(".cancel");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const totalInput = document.querySelector(".total-pages");
const completedInput = document.querySelector(".completed-pages");
const warnText = document.querySelector(".warn");

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
  newBook.classList.add("book-wrapper");
  newBook.innerHTML = ``;
  wrapper.appendChild(newBook);
  console.log(a, b, c, d);
}

function checkCompletedPages() {
  let a = Number(totalInput.value);
  let b = Number(completedInput.value);
  if (a == "" || b > a) {
    completedInput.value = totalInput.value;
    return;
  }
}
