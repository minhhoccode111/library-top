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

totalInput.oninput = (e) => {
  if (
    e.target.value > 99999 ||
    e.target.value < 0 ||
    !Number.isInteger(e.target.value)
  ) {
    return;
  }
};

completedInput.oninput = (e) => {
  if (
    totalInput.value == "" ||
    Number(e.target.value) > Number(totalInput.value)
  ) {
    completedInput.value = totalInput.value;
    return;
  }
};
function checkCompletedPages() {}

function Book(title, author, total, completed) {
  (this.title = title),
    (this.author = author),
    (this.total = total),
    (this.completed = completed),
    (this.index = myLibrary.lengthj - 1);
}
//two kinds of properties one is defined directly on the object instance itself using this keyword
// one is prototype properties and defined on the prototype with the syntax Constructor.prototype.property_name='abcxyz'
Book.prototype.createElementBook = function () {
  const div = document.createElement("div");
  div.classList.add("");
  div.setAttribute("data-index", `${this.index}`);
  div.innerHTML = `Title: ${this.title}, <br>Author: ${this.author},<br>Total pages: ${this.total},<br>Page you've read: ${this.conpleted}`;
};
function pushBookToArray() {}

function resetForm() {
  [
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value,
  ] = ["", "", "", ""];
} //remember to fix some default info of form
