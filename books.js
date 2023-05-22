"use strict";
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") e.preventDefault();
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
const inputs = document.querySelectorAll(".inputs-container");

let myLibrary = [];

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
inputs.forEach(
  (e) =>
    (e.onkeyup = (e) => {
      if (e.key === "Enter") {
        addBtn.click();
      }
    })
);

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

class Book {
  constructor(title, author, total, completed) {
    this.title = title;
    this.author = author;
    this.total = total;
    this.completed = completed;
    this.index = myLibrary.length;
  }
  createElementBook() {
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
  }
  getInfo() {
    return [this.title, this.author, this.total, this.completed, this.index];
  }
  getTitle() {
    return this.title;
  }
  getAuthor() {
    return this.author;
  }
  getCompleted() {
    return this.completed;
  }
  getTotal() {
    return this.total;
  }
  setTitle(newTitle) {
    this.title = newTitle;
  }
  setAuthor(newAuthor) {
    this.author = newAuthor;
  }
  setCompleted(newCompleted) {
    this.completed = newCompleted;
  }
  // setTotal :function (newTotal) {this.total = newTotal}, we don't have edit total pages feature
  setIndex(newIndex) {
    this.index = newIndex;
  }
  increaseCompleted() {
    this.completed++;
  }
  decreaseCompleted() {
    this.completed--;
  }
  markCompleted() {
    this.completed = this.total;
  }
}
function showBooks(arr) {
  library.innerHTML = ""; //refresh page
  myLibrary.forEach((book) => {
    book.setIndex(myLibrary.indexOf(book)); //refresh all indexes of books if we have change in myLibrary array
    book.createElementBook(); //then re-create every book
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

  editBtns.forEach((editBtn) =>
    editBtn.addEventListener("click", editBtnsListener)
  );
  removeBtns.forEach((removeBtn) =>
    removeBtn.addEventListener("click", removeBtnsListener)
  );
  plusBtns.forEach((plusBtn) =>
    plusBtn.addEventListener("click", plusAndMinusListener)
  );
  minusBtns.forEach((minusBtn) =>
    minusBtn.addEventListener("click", plusAndMinusListener)
  );
  checkBtns.forEach((checkBtn) =>
    checkBtn.addEventListener("click", plusAndMinusListener)
  );
}

function removeBtnsListener(e) {
  myLibrary.splice(`${e.target.getAttribute("data-index")}`, 1); //remove book with the same index with the remove button that have been clicked
  showBooks(myLibrary); //refresh
}

function editBtnsListener(e) {
  const thisEditBtnIndex = e.currentTarget.getAttribute("data-index");
  //get index of the editBtn we've clicked
  const editPopupCtn = document.querySelector(".edit-popup-container");
  const editPopup = document.querySelector(".edit-popup");
  const confirmBtn = document.querySelector(".new-confirm");
  const popupTitleInputs = document.querySelector(".new-title");
  const popupAuthorInputs = document.querySelector(".new-author");
  const popupCompletedInputs = document.querySelector(".new-completed-pages");
  const newCompletedPages = document.querySelector(".new-completed-pages");
  editPopupCtn.classList.remove("none");

  editPopup.onclick = (e) => e.stopPropagation();
  editPopupCtn.onclick = (e) => {
    editPopupCtn.classList.add("none");
    [
      popupTitleInputs.value,
      popupAuthorInputs.value,
      popupCompletedInputs.value,
    ] = ["", "", ""];
  };
  newCompletedPages.onkeydown = ignoreKeys;
  confirmBtn.onclick = (e) => {
    if (popupTitleInputs.value != "") {
      myLibrary[thisEditBtnIndex].setTitle(popupTitleInputs.value);
    }
    if (popupAuthorInputs.value != "") {
      myLibrary[thisEditBtnIndex].setAuthor(popupAuthorInputs.value);
    }
    if (popupCompletedInputs.value != "") {
      if (
        Number(popupCompletedInputs.value) <=
          myLibrary[thisEditBtnIndex].getTotal() &&
        Number(popupCompletedInputs.value) >= 0 &&
        Number.isInteger(Number(popupCompletedInputs.value))
      ) {
        myLibrary[thisEditBtnIndex].setCompleted(popupCompletedInputs.value);
      } else {
        alert(
          "Please adjust the completed pages's number to sommething that is integer, in the range between 0 and total pages's number."
        );
      }
    }
    editPopupCtn.onclick();
    showBooks(myLibrary);
  };
}

function plusAndMinusListener(e) {
  const thisCompletedSpan = document.querySelector(
    `.book-completed[data-index="${e.target.getAttribute("data-index")}"]`
  );
  const thisTotalSpan = document.querySelector(
    `.book-total[data-index="${e.target.getAttribute("data-index")}"]`
  );
  if (e.target.classList.contains("plus")) {
    if (thisCompletedSpan.textContent == thisTotalSpan.textContent) return;
    myLibrary[e.target.getAttribute("data-index")].increaseCompleted();
    showBooks(myLibrary);
  }
  if (e.target.classList.contains("minus")) {
    if (thisCompletedSpan.textContent < 1) return;
    myLibrary[e.target.getAttribute("data-index")].decreaseCompleted();
    showBooks(myLibrary);
  }
  if (e.target.classList.contains("check")) {
    myLibrary[e.target.getAttribute("data-index")].markCompleted();
    showBooks(myLibrary);
  }
}

function resetForm() {
  [
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value,
  ] = ["", "", "", ""];
} //remember to fix some default info of form
resetForm();
