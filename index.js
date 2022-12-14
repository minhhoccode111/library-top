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
  e.preventDefault();
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

function checkCompletedPages() {
  let a = Number(totalInput.value);
  let b = Number(completedInput.value);
  if (a == "" || b > a) {
    completedInput.value = totalInput.value;
    return;
  }
}
