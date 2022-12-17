"use strict";

const formContainerEdit = document.querySelector(".edit-form-container");
const haveReadButtonEdit = document.querySelector(".switchOnEditing");
const addButtonEdit = document.querySelector(".addOnEditing");
const cancelButtonEdit = document.querySelector(".cancelOnEditing");
const titleInputEdit = document.querySelector(".titleOnEditing");
const authorInputEdit = document.querySelector(".authorOnEditing");
const totalInputEdit = document.querySelector(".total-pagesOnEditing");
const completedInputEdit = document.querySelector(".completed-pagesOnEditing");
const warnTextEdit = document.querySelector(".warnOnEditing");
const optionsDiv = document.querySelector(".options");
const removeButton = document.querySelector(".button-remove");
const editButton = document.querySelector(".button-edit");

cancelButtonEdit.onclick = () => formContainerEdit.classList.add("none");
// editButton.onclick = () => formContainerEdit.classList.remove("none");

function showBooks(a, b, c, d) {
  const newBook = document.createElement("div");
  newBook.setAttribute("class", "book-container");
  newBook.setAttribute("data-index", `${index}`);
  index++;
  // const options = document.createElement("div");
  // options.classList.add("options");
  // newBook.appendChild(options);
  // const content = document.createElement("div");
  // content.classList.add("content");
  // newBook.appendChild(content);
  // const pagesController = document.createElement("div");
  // pagesController.classList.add("pages-controller");
  // newBook.appendChild(pagesController);
  // const pagesCount = document.createElement("div");
  // pagesCount.classList.add("pages-count");
  // newBook.appendChild(pagesCount);
  // // options childs
  // const optionsEditButton = document.createElement("button");
  // optionsEditButton.classList.add("button", "green-bg", "button-edit");
  // optionsEditButton.innerHTML = "Edit";
  // options.appendChild(optionsEditButton);
  // const optionsRemoveButton = document.createElement("button");
  // optionsRemoveButton.classList.add("button", "red-bg", "button-remove");
  // optionsRemoveButton.innerHTML = "Remove";
  // options.appendChild(optionsRemoveButton);
  // optionsEditButton.onclick = () => formContainerEdit.classList.remove("none");
  // // content childs
  // const contentTitle = document.createElement("h2");
  // contentTitle.classList.add("title");
  // contentTitle.innerHTML = `${a}`;
  // content.appendChild(contentTitle);
  // const contentAuthor = document.createElement("h3");
  // contentAuthor.classList.add("author");
  // contentAuthor.innerHTML = `${b}`;
  // content.appendChild(contentAuthor);
  // // pages-controller childs
  // const pagesControllerMinusButton = document.createElement("button");
  // pagesControllerMinusButton.classList.add("button", "minus-gb");
  // pagesControllerMinusButton.innerHTML = `-`;
  // pagesController.appendChild(pagesControllerMinusButton);
  // const pagesControllerCheckButton = document.createElement("button");
  // pagesControllerCheckButton.classList.add("button", "check-gb");
  // pagesControllerCheckButton.innerHTML = `✓`;
  // pagesController.appendChild(pagesControllerCheckButton);
  // const pagesControllerPlusButton = document.createElement("button");
  // pagesControllerPlusButton.classList.add("button", "plus-gb");
  // pagesControllerPlusButton.innerHTML = `+`;
  // pagesController.appendChild(pagesControllerPlusButton);
  // // pages-count childs
  // const pagesCountCompleted = document.createElement("h2");
  // pagesCountCompleted.classList.add("completed");
  // pagesCountCompleted.innerHTML = `${d}`;
  // pagesCount.appendChild(pagesCountCompleted);
  // const pagesCountSeperator = document.createElement("span");
  // pagesCountSeperator.classList.add("seperator");
  // pagesCountSeperator.innerHTML = `|`;
  // pagesCount.appendChild(pagesCountSeperator);
  // const pagesCountTotal = document.createElement("h2");
  // pagesCountTotal.classList.add("total");
  // pagesCountTotal.innerHTML = `${c}`;
  // pagesCount.appendChild(pagesCountTotal);
  // asdasd
  newBook.innerHTML = `
  <div class="options">
  <button class="button green-bg button-edit">Edit</button>
  <button class="button red-bg button-remove">Remove</button>
  </div>
  <div class="content">
  <h2 class="title">${a}</h2>
  <h3 class="author">${b}</h3>
  </div>
  <div class="pages-controller">
  <button class="button minus-gb">-</button>
  <button class="button check-gb" style="">✓</button>
  <button class="button plus-gb">+</button>
  </div>
  <div class="pages-count">
  <h2 class="completed">${d}</h2>
  <span class="separator">|</span>
  <h2 class="total">${c}</h2>
  </div>
  `;
  wrapper.appendChild(newBook);
  const buttonsEdit = document.querySelectorAll(".button-edit");
  buttonsEdit.forEach((button) =>
    button.addEventListener("click", (e) => {
      // formContainerEdit.classList.remove('none')
      console.log(e.target.dataset.index);
    })
  );
  // buttonEdit.onclick = () => formContainerEdit.classList.remove("none");
  const buttonRemove = document.querySelector(".button-remove");
  buttonRemove.onclick = (e) => console.log(e.target);
}
