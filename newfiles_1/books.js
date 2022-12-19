"use strict";
console.log("hello world from html");
window.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

const wrapper = document.querySelector(".wrapper");
const library = document.querySelector(".library");
const formCtn = document.querySelector(".form-container");
const formWrapper = document.querySelector(".form-wrapper");
const plusBtn = document.querySelector(".plus-button");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const totalInput = document.querySelector(".total-pages");
const completedInput = document.querySelector(".completed-pages");
const cancelBtn = document.querySelector(".cancel");
const addBtn = document.querySelector(".add");
const haveReadBtn = document.querySelector(".switch");
const warnText = document.querySelector(".warn");

let myLibrary = [];
let currentIndex;

plusBtn.onclick = () => formCtn.classList.remove("none");
formCtn.onclick = () => formCtn.classList.add("none");
formWrapper.onclick = (e) => e.stopPropagation();
cancelBtn.onclick = () => {
  formCtn.classList.add("none");
  resetForm();
};
haveReadBtn.onclick = (e) => {
  completedInput.value = totalInput.value;
  e.preventDefault();
  e.stopPropagation();
};
completedInput.onkeydown = ignoreKeys;
totalInput.onkeydown = ignoreKeys;
function ignoreKeys(e) {
  if (
    //do nothing if out input has
    (e.target.value == "" && e.key == "0") || // start with a zero 0
    e.key == "-" || //minus
    e.key == "." || //dot
    e.key == "." //another kind of dot
  ) {
    e.preventDefault();
    return;
  }
}
totalInput.oninput = (e) => {
  if (e.target.value > 99999) {
    e.target.value = 100000;
  }
}; // total pages has been limited to 100000
completedInput.oninput = (e) => {
  if (Number(e.target.value) > Number(totalInput.value)) {
    // e.preventDefault();
    e.target.value = totalInput.value;
    return;
  }
}; //completed pages has been limited to equal total pages
addBtn.onclick = handleAddBtn;

function handleAddBtn(e) {
  e.preventDefault();
  if (
    titleInput.value === "" ||
    authorInput.value === "" ||
    totalInput.value == "" ||
    completedInput.value == ""
  ) {
    return warnText.classList.remove("none");
  } // show warn text and return
  warnText.classList.add("none"); //remove warn text
  formCtn.classList.add("none"); //remove form
  myLibrary.push(
    new Book(
      titleInput.value,
      authorInput.value,
      totalInput.value,
      completedInput.value
    )
  );
  console.log(myLibrary);
  resetForm(); //reset form
  showBooks();
}

function Book(title, author, total, completed) {
  (this.title = title),
    (this.author = author),
    (this.total = total),
    (this.completed = completed),
    (this.index = myLibrary.length);
}
Book.prototype.createElementBook = function () {
  const div = document.createElement("div");
  div.classList.add("");
  div.setAttribute("data-index", `${this.index}`);
  div.innerHTML = `Title: ${this.title}, <br>Author: ${this.author},<br>Total pages: ${this.total},<br>Page you've read: ${this.conpleted}`;
};

function resetForm() {
  [
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value,
  ] = ["123", "123", "123", "123"];
} //remember to fix some default info of form

function startedForm() {
  [
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value,
  ] = ["default", "default", "123", "123"];
}
startedForm();
