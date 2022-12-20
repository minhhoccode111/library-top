"use strict";
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
  resetForm(); //reset form
  showBooks(myLibrary);
}

function Book(title, author, total, completed) {
  (this.title = title),
    (this.author = author),
    (this.total = total),
    (this.completed = completed),
    (this.index = myLibrary.length);
  this.getInfo = function () {
    return [this.title, this.author, this.total, this.completed, this.index];
  };
  this.setTitle = (newTitle) => (this.title = newTitle);
  this.setAuthor = (newAuthor) => (this.author = newAuthor);
  this.setCompleted = (newCompleted) => (this.completed = newCompleted);
  // this.setTotal = (newTotal) => (this.total = newTotal); we don't have edit total pages feature
  this.setIndex = (newIndex) => (this.index = newIndex);
  this.increaseCompleted = () => this.completed++;
  this.decreaseCompleted = () => this.completed--;
  this.markCompleted = () => (this.completed = this.total);
}
Book.prototype.createElementBook = function () {
  const div = document.createElement("div");
  div.classList.add("book-container");
  div.setAttribute("data-index", `${this.index}`);
  div.innerHTML = `<h2 class="book-title" data-index="${this.index}">${this.title}</h2>
  <h3 class="book-author" data-index="${this.index}">${this.author}</h3>
  <h3 class="pages">
  <span class="book-completed" data-index="${this.index}">${this.completed}</span>/<span class="book-total" data-index="${this.index}">${this.total}</span>
  </h3>
  <button class="btn book-button-edit" data-index="${this.index}">&#9999</button>
  <button class="btn book-button-remove" data-index="${this.index}">&#10006</button>
  <button class="btn minus" data-index="${this.index}">-</button>
  <button class="btn check" data-index="${this.index}">✓</button>
  <button class="btn plus" data-index="${this.index}">+</button>
  `;
  library.appendChild(div);
};
function showBooks(arr) {
  library.innerHTML = ""; //refresh page
  myLibrary.forEach((book) => {
    book.setIndex(myLibrary.indexOf(book)); //refresh all indexes of books if we have change in myLibrary array
    book.createElementBook();
  });
  defineElementsJustCreated();
}

function defineElementsJustCreated() {
  //defined elements we just create and show
  const editBtns = document.querySelectorAll(".book-button-edit");
  const removeBtns = document.querySelectorAll(".book-button-remove");
  const plusBtns = document.querySelectorAll(".btn.plus");
  const minusBtns = document.querySelectorAll(".btn.minus");
  const checkBtns = document.querySelectorAll(".btn.check");

  editBtns.forEach((editBtn) => editBtnsListener(editBtn));
  removeBtns.forEach((removeBtn) => removeBtnsListener(removeBtn));
  plusBtns.forEach((plusBtn) => plusAndMinusListener(plusBtn));
  minusBtns.forEach((minusBtn) => plusAndMinusListener(minusBtn));
  checkBtns.forEach((checkBtn) => plusAndMinusListener(checkBtn));
}
//FIXME just finished removeBtns click event

function removeBtnsListener(removeBtn) {
  removeBtn.addEventListener("click", (e) => {
    myLibrary.splice(`${e.target.getAttribute("data-index")}`, 1);
    showBooks(myLibrary);
  });
}

function editBtnsListener(btn) {
  btn.addEventListener("click", (e) => {
    const indexOfThisElement = e.currentTarget.getAttribute("data-index");
    console.log(indexOfThisElement);
    const editPopupCtn = document.querySelector(".edit-popup-container");
    editPopupCtn.classList.remove("none");
    const editPopup = document.querySelector(".edit-popup");
    const confirmBtn = document.querySelector(".new-confirm");
    const popupTitleInputs = document.querySelector(".new-title");
    const popupAuthorInputs = document.querySelector(".new-author");
    const popupCompletedInputs = document.querySelector(".new-completed-pages");

    editPopup.onclick = (e) => e.stopPropagation();
    editPopupCtn.onclick = () => {
      editPopupCtn.classList.add("none");
      [
        popupTitleInputs.value,
        popupAuthorInputs.value,
        popupCompletedInputs.value,
      ] = ["", "", ""];
    };
    confirmBtn.addEventListener("click", (e) => {
      console.log("clicked");
      myLibrary[indexOfThisElement].setTitle(popupTitleInputs.value);
      myLibrary[indexOfThisElement].setAuthor(popupAuthorInputs.value);
      myLibrary[indexOfThisElement].setCompleted(popupCompletedInputs.value);
      showBooks(myLibrary);
      editPopupCtn.onclick();
      console.log("asd");
      return;
    });
  });
}

function plusAndMinusListener(btn) {
  btn.addEventListener("click", (e) => {
    const thisCompletedSpan = document.querySelector(
      `.book-completed[data-index="${e.target.getAttribute("data-index")}"]`
    );
    const thisTotalSpan = document.querySelector(
      `.book-total[data-index="${e.target.getAttribute("data-index")}"]`
    );
    if (btn.classList.contains("plus")) {
      if (thisCompletedSpan.textContent == thisTotalSpan.textContent) return;
      myLibrary[e.target.getAttribute("data-index")].increaseCompleted();
      showBooks(myLibrary);
    }
    if (btn.classList.contains("minus")) {
      if (thisCompletedSpan.textContent < 1) return;
      myLibrary[e.target.getAttribute("data-index")].decreaseCompleted();
      showBooks(myLibrary);
    }
    if (btn.classList.contains("check")) {
      myLibrary[e.target.getAttribute("data-index")].markCompleted();
      showBooks(myLibrary);
    }
  });
}

function resetForm() {
  [
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value,
  ] = ["12345", "1234", "123", "12"];
} //remember to fix some default info of form

function startedForm() {
  [
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value,
  ] = ["default", "default", "1234", "123"];
}
startedForm(); //this started Form make default value so that I can fix easily
