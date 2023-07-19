window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  class Book {
    constructor(title, author, total, completed) {
      this.title = title;
      this.author = author;
      this.total = total;
      this.completed = completed;
      //each time new book is created, its index will be the length of the library (last index + 1)
      this.index = myLibrary.length;
    }

    //each book will have a method to create itself a div to show its contents
    createElementBook() {
      const div = document.createElement('div');
      div.classList.add('book-container');
      div.setAttribute('data-index', `${this.index}`);
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

  const Storage = () => {};
  Storage.get = function (name) {
    return localStorage.getItem(name) === null ? [] : JSON.parse(localStorage.getItem(name));
  };
  Storage.set = function (name, arr) {
    localStorage.setItem(name, JSON.stringify(arr));
  };

  const wrapper = document.querySelector('.wrapper');
  const library = document.querySelector('.library');
  const formCtn = document.querySelector('.form-container');
  const formWrapper = document.querySelector('.form-wrapper');
  const plusBtn = document.querySelector('.plus-button');
  const titleInput = document.querySelector('.title');
  const authorInput = document.querySelector('.author');
  const totalInput = document.querySelector('.total-pages');
  const completedInput = document.querySelector('.completed-pages');
  const cancelBtn = document.querySelector('.cancel');
  const addBtn = document.querySelector('.add');
  const haveReadBtn = document.querySelector('.switch');
  const warnText = document.querySelector('.warn');
  const inputs = document.querySelectorAll('.inputs-container');

  //get local storage every time the page is loaded
  let myLibrary = Storage.get('library');

  //set every books to have Book class's prototype because when we use JSON.parse() in Storage.getStorageLibrary(), it will return an array with books object but objects inside it will not have the prototype of Book class
  for (let book of myLibrary) {
    Object.setPrototypeOf(book, Book.prototype);
  }

  //show all books
  showBooks(myLibrary);

  //show form when plus button is clicked
  plusBtn.onclick = () => formCtn.classList.remove('none');

  //hide form when click on form container (outside of form)
  formCtn.onclick = () => formCtn.classList.add('none');

  //stop propagation when we click on the form so that it doesn't fire to the form container
  formWrapper.onclick = (e) => e.stopPropagation();

  //hide form and reset all form values when we clicked on cancel button
  cancelBtn.onclick = () => {
    formCtn.classList.add('none');
    resetForm();
  };

  //make completed pages equal to total pages when click have read button
  haveReadBtn.onclick = (e) => {
    completedInput.value = totalInput.value;
    e.preventDefault();
    e.stopPropagation();
  };

  //ignore keys that isn't legit
  completedInput.onkeydown = ignoreKeys;
  totalInput.onkeydown = ignoreKeys;

  function ignoreKeys(e) {
    if (
      //do nothing if our input has
      (e.target.value == '' && e.key == '0') || // start with a zero 0
      e.key == '-' || //minus
      e.key == '.' || //dot
      e.key == '.' //another kind of dot
    ) {
      e.preventDefault();
      return;
    }
  }

  //limit total pages
  totalInput.oninput = (e) => {
    if (e.target.value > 99999) {
      e.target.value = 100000;
    }
  }; // total pages has been limited to 100000

  //limit completed pages
  completedInput.oninput = (e) => {
    if (Number(e.target.value) > Number(totalInput.value)) {
      // e.preventDefault();
      e.target.value = totalInput.value;
      return;
    }
  }; //completed pages has been limited to equal total pages

  //close form when we submit with "enter" key
  inputs.forEach(
    (e) =>
      (e.onkeyup = (e) => {
        if (e.key === 'Enter') {
          addBtn.click();
        }
      })
  );

  //add book when add button is clicked
  addBtn.onclick = handleAddBtn;

  function handleAddBtn(e) {
    e.preventDefault();
    if (titleInput.value === '' || authorInput.value === '' || totalInput.value == '' || completedInput.value == '') {
      return warnText.classList.remove('none');
    } // show warn text and return
    warnText.classList.add('none'); //remove warn text
    formCtn.classList.add('none'); //remove form
    myLibrary.push(new Book(titleInput.value, authorInput.value, totalInput.value, completedInput.value));
    resetForm(); //reset form
    showBooks(myLibrary); //show books library
    Storage.setStorageLibrary(myLibrary);
  }

  function showBooks() {
    library.innerHTML = ''; //refresh page's content
    myLibrary.map((book, index) => {
      book.setIndex(index); //refresh all indexes of books if we have change in myLibrary array
      book.createElementBook(); //then re-create every book
    });
    defineElementsJustCreated(); //define add buttons and functionalities on all new books
  }

  function defineElementsJustCreated() {
    //defined elements we just create and show
    const editBtns = document.querySelectorAll('.book-button-edit');
    const removeBtns = document.querySelectorAll('.book-button-remove');
    const plusBtns = document.querySelectorAll('.btn.plus');
    const minusBtns = document.querySelectorAll('.btn.minus');
    const checkBtns = document.querySelectorAll('.btn.check');

    editBtns.forEach((editBtn) => editBtn.addEventListener('click', editBtnsListener));
    removeBtns.forEach((removeBtn) => removeBtn.addEventListener('click', removeBtnsListener));
    plusBtns.forEach((plusBtn) => plusBtn.addEventListener('click', plusAndMinusListener));
    minusBtns.forEach((minusBtn) => minusBtn.addEventListener('click', plusAndMinusListener));
    checkBtns.forEach((checkBtn) => checkBtn.addEventListener('click', plusAndMinusListener));
  }

  function removeBtnsListener(e) {
    myLibrary.splice(`${e.target.getAttribute('data-index')}`, 1); //remove book with the same index with the remove button that have been clicked
    showBooks(myLibrary); //refresh
    Storage.setStorageLibrary(myLibrary);
  }

  function editBtnsListener(e) {
    const thisEditBtnIndex = e.currentTarget.getAttribute('data-index');
    //get index of the editBtn we've clicked
    const editPopupCtn = document.querySelector('.edit-popup-container');
    const editPopup = document.querySelector('.edit-popup');
    const confirmBtn = document.querySelector('.new-confirm');
    const popupTitleInputs = document.querySelector('.new-title');
    const popupAuthorInputs = document.querySelector('.new-author');
    const popupCompletedInputs = document.querySelector('.new-completed-pages');
    const newCompletedPages = document.querySelector('.new-completed-pages');
    editPopupCtn.classList.remove('none');

    //stop propagation when we click the form, so that it won't close
    editPopup.onclick = (e) => e.stopPropagation();

    //if we click outside of the edit form (edit popup container) then it will
    editPopupCtn.onclick = (e) => {
      //hide form container
      editPopupCtn.classList.add('none');
      [
        //reset all inputs in edit form
        popupTitleInputs.value,
        popupAuthorInputs.value,
        popupCompletedInputs.value,
      ] = ['', '', ''];
    };

    //listen to ignore some invalid keys
    newCompletedPages.onkeydown = ignoreKeys;

    //confirm button clicked
    confirmBtn.onclick = (e) => {
      //change book's values base on edit form inputs
      if (popupTitleInputs.value != '') {
        myLibrary[thisEditBtnIndex].setTitle(popupTitleInputs.value);
      }
      if (popupAuthorInputs.value != '') {
        myLibrary[thisEditBtnIndex].setAuthor(popupAuthorInputs.value);
      }
      if (popupCompletedInputs.value != '') {
        if (Number(popupCompletedInputs.value) <= myLibrary[thisEditBtnIndex].getTotal() && Number(popupCompletedInputs.value) >= 0 && Number.isInteger(Number(popupCompletedInputs.value))) {
          myLibrary[thisEditBtnIndex].setCompleted(popupCompletedInputs.value);
        } else {
          alert("Please adjust the completed pages's number to something that is integer, in the range between 0 and total pages's number.");
        }
      }

      //hide form container
      editPopupCtn.onclick();
      showBooks(myLibrary);
      Storage.setStorageLibrary(myLibrary);
    };
  }

  function plusAndMinusListener(e) {
    //change book value base on buttons click
    const thisCompletedSpan = document.querySelector(`.book-completed[data-index="${e.target.getAttribute('data-index')}"]`);
    const thisTotalSpan = document.querySelector(`.book-total[data-index="${e.target.getAttribute('data-index')}"]`);
    if (e.target.classList.contains('plus')) {
      if (thisCompletedSpan.textContent == thisTotalSpan.textContent) return;
      myLibrary[e.target.getAttribute('data-index')].increaseCompleted();
    }
    if (e.target.classList.contains('minus')) {
      if (thisCompletedSpan.textContent < 1) return;
      myLibrary[e.target.getAttribute('data-index')].decreaseCompleted();
    }
    if (e.target.classList.contains('check')) {
      myLibrary[e.target.getAttribute('data-index')].markCompleted();
    }
    showBooks(myLibrary);
    Storage.setStorageLibrary(myLibrary);
  }

  //reset form to empty
  function resetForm() {
    [titleInput.value, authorInput.value, totalInput.value, completedInput.value] = ['', '', '', ''];
  } //remember to fix some default info of form
  resetForm();
  // Storage.setStorageLibrary([]);//reset myLibrary on localStorage
});
