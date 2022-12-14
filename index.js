"use strict";
console.log("hello world from html");

const plusButton = document.querySelector(".add-button");
const formContainer = document.querySelector(".form-container");
const haveReadButton = document.querySelector(".switch");
const addButton = document.querySelector(".add");
const cancelButton = document.querySelector(".cancel");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const totalInput = document.querySelector(".total-pages");
const completedInput = document.querySelector(".completed-pages");

plusButton.onclick = () => formContainer.classList.remove("none");
cancelButton.onclick = () => formContainer.classList.add("none");
haveReadButton.onclick = () => (completedInput.value = totalInput.value);
addButton.onclick = handleAddButton;

let myLibrary = [];
let book;

function handleAddButton(e) {
  // inputs.forEach((input) => console.log(input.value));
  if (
    titleInput.value === "" ||
    authorInput.value === "" ||
    totalInput.value == "" ||
    completedInput == ""
  ) {
    return;
  }
  book = new Book(
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value
  );
  myLibrary.push(book);
  console.log(myLibrary);
}

function Book(title, author, total, completed) {
  this.title = title;
  this.author = author;
  this.total = total;
  this.completed = completed;
  //the constructor
}

function addBookToLibrary() {
  //do something
}

function showBooksInLibrary() {}
