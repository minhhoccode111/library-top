"use strict";

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
cancelBtn.onclick = () => formCtn.classList.add("none");
formCtn.onclick = () => formCtn.classList.add("none"); // return when we clicked outside the popup form
formWrapper.onclick = (e) => e.stopPropagation(); //stopPropagation so that the formCtn don't receive click event when we click formwrapper
haveReadBtn.onclick = () => (completedInput.value = totalInput.value);
completedInput.addEventListener("input", checkCompletedPages);
addBtn.onclick = handleAddBtn;

let myLibrary = [
  { title: "Ngu", author: "Non", total: 400, completed: 300 },
  { title: "Oc cho", author: "Ga", total: 500, completed: 400 },
  { title: "Thieu nang", author: "Kem", total: 600, completed: 500 },
  { title: "Suc vat", author: "Bai nao", total: 700, completed: 600 },
];
function handleAddBtn(e) {
  e.preventDefault();
  if (
    titleInput.value === "" ||
    authorInput.value === "" ||
    totalInput.value == "" ||
    completedInput.value == ""
  )
    return warnText.classList.remove("none"); // show warn text and return
  warnText.classList.add("none"); //remove warn text
  formCtn.classList.add("none");
  pushBookToLibrary(
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value
  );
  resetForm(); //reset form
  library.innerHTML = ""; //reset or refresh or reload the page
  showBooks(myLibrary); //add index and display() method to every element in array
}
//FIXME FIXME FIXME FIXME

function resetForm() {
  [
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value,
  ] = ["a", "b", "11", "2"];
}

function Book(title, author, total, completed) {
  this.title = title;
  this.author = author;
  this.total = total;
  this.completed = completed;
  this.index = myLibrary.length;
  //the constructor
}

function pushBookToLibrary(title, author, total, completed) {
  myLibrary.push(new Book(title, author, total, completed));
}

function showBooks(arr) {
  //add display() method and index property to every book object in library array
  let i = 0; //it doesn't show any thing, just add
  arr.map((a) => {
    a.index = i++;
    a.display = function () {
      const newBook = document.createElement("div");
      newBook.classList.add("book-container");
      newBook.setAttribute("data-index", `${a.index}`);
      newBook.innerHTML = `
      <button class="btn book-button-edit" data-index="${a.index}">Edit</button>
      <button class="btn book-button-remove" data-index="${a.index}">Remove</button>
      <h2 class="book-title" data-index="${a.index}">${a.title}</h2>
      <p class="book-author" data-index="${a.index}">${a.author}</p>
      <button class="btn minus" data-index="${a.index}">-</button>
      <button class="btn check" data-index="${a.index}">✓</button>
      <button class="btn plus" data-index="${a.index}">+</button>
      <h2 class="book-completed" data-index="${a.index}">${a.completed}</h2>
      <span class="separator">|</span>
      <h2 class="book-total" data-index="${a.index}">${a.total}</h2>
      `;
      library.appendChild(newBook);
    };
  });
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].display();
  }
  //and we have to redefined buttons every single time we have change in the array
  redefinedAllButtons();
}

function redefinedAllButtons() {
  const buttons = document.querySelectorAll("button");
  const removeBtns = document.querySelectorAll(".book-button-remove");
  const plusBtn = document.querySelectorAll(".btn.plus");

  buttons.forEach((button) => allButtonsListener(button)); //fancy backgroundColor random on buttons
  removeBtns.forEach((removeBtn) => removeButtonsListener(removeBtn));
}

function allButtonsListener(button) {
  button.addEventListener("mouseenter", buttonHandleMouseEnter);
  button.addEventListener("mouseout", buttonHandleMouseOut);
  button.addEventListener("mousedown", buttonHandleMouseEnter);
  button.addEventListener("mouseup", buttonHandleMouseEnter);
} //FIXME I just move addListener to outside and link them together

function removeButtonsListener(removeBtn) {
  removeBtn.addEventListener("click", (e) => {
    myLibrary.splice(`${e.target.getAttribute("data-index")}`, 1);
    library.innerHTML = ""; //reset or refresh or reload the page
    showBooks(myLibrary);
  });
}

showBooks(myLibrary);

function checkCompletedPages() {
  if (
    Number(totalInput.value) == "" ||
    Number(completedInput.value) > Number(totalInput.value)
  ) {
    completedInput.value = totalInput.value;
    return;
  }
}
function buttonHandleMouseEnter(e) {
  const colorDigit = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let hex;
  let hexR1, hexG1, hexB1, hexR2, hexG2, hexB2;
  hexR1 = colorDigit[Math.floor(Math.random() * 16)];
  hexR2 = colorDigit[Math.floor(Math.random() * 16)];
  hexG1 = colorDigit[Math.floor(Math.random() * 16)];
  hexG2 = colorDigit[Math.floor(Math.random() * 16)];
  hexB1 = colorDigit[Math.floor(Math.random() * 16)];
  hexB2 = colorDigit[Math.floor(Math.random() * 16)];
  hex = `#${hexR1}${hexR2}${hexG1}${hexG2}${hexB1}${hexB2}`;
  e.target.style.backgroundColor = hex;
  return;
}
function buttonHandleMouseOut(e) {
  if (
    e.target.classList.contains("book-button-remove") ||
    e.target.classList.contains("minus") ||
    e.target.classList.contains("cancel")
  ) {
    e.target.style.backgroundColor = "red";
    return;
  }
  if (
    e.target.classList.contains("book-button-edit") ||
    e.target.classList.contains("plus") ||
    e.target.classList.contains("add") ||
    e.target.classList.contains("switch")
  ) {
    e.target.style.backgroundColor = "green";
    return;
  }
  if (e.target.classList.contains("check")) {
    e.target.style.backgroundColor = "blue";
    return;
  }
  if (e.target.classList.contains("plus-button")) {
    e.target.style.backgroundColor = "palegoldenrod";
    return;
  }
} //set its background color back to normal when mouse out

//delete startedForm() after finish program
function startedForm() {
  [
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value,
  ] = ["abc", "xyz", "123123", "12312"];
}
startedForm();
