("use strict");

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
cancelBtn.onclick = () => {
  formCtn.classList.add("none");
  resetForm();
};
formCtn.onclick = () => formCtn.classList.add("none"); // return when we clicked outside the popup form
formWrapper.onclick = (e) => e.stopPropagation(); //stopPropagation so that the formCtn don't receive click event when we click formwrapper (formWrapper is placing inside formCtn)
haveReadBtn.onclick = () => (completedInput.value = totalInput.value);
completedInput.addEventListener("input", checkCompletedPages);
totalInput.addEventListener("input", () => {
  if (totalInput.value > 99999) {
    totalInput.value = 100000;
    return;
  }
});
addBtn.onclick = handleAddBtn;

let currentIndex = undefined;
let myLibrary = [
  {
    title: "How to think like a Programmer.",
    author: "Non",
    total: 260,
    completed: 10,
  },
  {
    title: "HeadFirst JavaScript.",
    author: "Eric Freeman & Elisabeth Robson",
    total: 728,
    completed: 316,
  },
  {
    title: "The principles of Object-Oriented in Java Script.",
    author: "Nicholas C.Zakas",
    total: 122,
    completed: 19,
  },
  {
    title: "HeadFirst Design Patterns.",
    author: "Eric Freeman & Elisabeth Robson",
    total: 867,
    completed: 1,
  },
  {
    title: "Cracking the CODING INTERVIEW.",
    author: "Gatle Laakmann McDowell",
    total: 712,
    completed: 1,
  },
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

function resetForm() {
  [
    titleInput.value,
    authorInput.value,
    totalInput.value,
    completedInput.value,
  ] = ["", "", "", ""];
} //remember to fix some default info of form

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
  //and we have to define elements every single time we have change in the array
  defineElementsInBooks();
}

function defineElementsInBooks() {
  const buttons = document.querySelectorAll("button");
  const editBtns = document.querySelectorAll(".book-button-edit");
  const removeBtns = document.querySelectorAll(".book-button-remove");
  const plusBtns = document.querySelectorAll(".btn.plus");
  const minusBtns = document.querySelectorAll(".btn.minus");
  const checkBtns = document.querySelectorAll(".btn.check");

  buttons.forEach((button) => allButtonsListener(button)); //fancy backgroundColor random on buttons
  editBtns.forEach((editBtn) => editButtonsListener(editBtn));
  removeBtns.forEach((removeBtn) => removeButtonsListener(removeBtn));
  plusBtns.forEach((plusBtn) => plusAndMinusListener(plusBtn));
  minusBtns.forEach((minusBtn) => plusAndMinusListener(minusBtn));
  checkBtns.forEach((checkBtn) => plusAndMinusListener(checkBtn));
}

function allButtonsListener(button) {
  button.addEventListener("mouseenter", buttonHandleMouseEnter);
  button.addEventListener("mouseout", buttonHandleMouseOut);
  button.addEventListener("mousedown", buttonHandleMouseEnter);
  button.addEventListener("mouseup", buttonHandleMouseEnter);
} // I just move addListener to outside and link them together

function editButtonsListener(editBtn) {
  editBtn.addEventListener("click", (e) => {
    currentIndex = e.currentTarget.getAttribute("data-index"); //set index to know specific element we are currently working on
    const editPopup = document.querySelector(".edit-popup");
    const editPopupCtn = document.querySelector(".edit-popup-container");
    const confirmBtn = document.querySelector(".new-confirm");
    editPopupCtn.classList.remove("none"); //show popup when edit buttons are clicked
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
    }; // click outside the editPopup (is editPopupCtn) will hide all popup things and reset the popup form for next use.
    confirmBtn.onclick = (e) => {
      if (popupTitleInputs.value != "") {
        myLibrary[currentIndex].title = popupTitleInputs.value;
      }
      if (popupAuthorInputs.value != "") {
        myLibrary[currentIndex].author = popupAuthorInputs.value;
      }
      if (popupCompletedInputs.value != "" && popupCompletedInputs.value >= 0) {
        if (popupCompletedInputs.value > myLibrary[currentIndex].total) {
          popupCompletedInputs.value = myLibrary[currentIndex].total;
          myLibrary[currentIndex].completed = popupCompletedInputs.value;
        } else {
          myLibrary[currentIndex].completed = popupCompletedInputs.value;
        }
      }
      editPopupCtn.onclick(); // we call onclick event on editPopupCtn just to reset popup form and hide it
      currentIndex = undefined; //reset current index
      library.innerHTML = ""; //reset or refresh or reload the page
      showBooks(myLibrary); //then show books again
    };
  });
}

function removeButtonsListener(removeBtn) {
  removeBtn.addEventListener("click", (e) => {
    myLibrary.splice(`${e.target.getAttribute("data-index")}`, 1);
    library.innerHTML = ""; //reset or refresh or reload the page
    showBooks(myLibrary);
  });
}

function plusAndMinusListener(a) {
  if (a.classList.contains("plus")) {
    a.addEventListener("click", (e) => {
      let completedPages = e.currentTarget.parentNode.childNodes[15];
      //select the completed-pages that is the 16th in the childNodes of the parent of the button we've click :)
      let totalPages = e.currentTarget.parentNode.childNodes[19];
      if (completedPages.textContent === totalPages.textContent) return;
      completedPages.textContent++; //then increase it
      return;
    });
  }
  if (a.classList.contains("minus")) {
    a.addEventListener("click", (e) => {
      let completedPages = e.currentTarget.parentNode.childNodes[15];
      //select the completed-pages that is the 16th in the childNodes of the parent of the button we've click :)
      if (completedPages.textContent == 0) return;
      completedPages.textContent--; //then decrease it
      return;
    });
  }
  if (a.classList.contains("check")) {
    a.addEventListener("click", (e) => {
      let completedPages = e.currentTarget.parentNode.childNodes[15];
      //select the completed-pages that is the 16th in the childNodes of the parent of the button we've click :)
      let totalPages = e.currentTarget.parentNode.childNodes[19];
      //select the completed-pages that is the 20th in the childNodes of the parent of the button we've click :)
      completedPages.textContent = totalPages.textContent; //then make it equal to check as finish
      return;
    });
  }
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
    e.target.classList.contains("switch") ||
    e.target.classList.contains("new-confirm")
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
// function startedForm() {
//   [
//     titleInput.value,
//     authorInput.value,
//     totalInput.value,
//     completedInput.value,
//   ] = ["default", "default", "123", "1"];
// }
// startedForm();
