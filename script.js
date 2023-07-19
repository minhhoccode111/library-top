// edit module used to edit book
const edit = (() => {
  let obj;
  let html;

  // interact with current obj
  const getObj = () => obj;
  const setObj = (o) => (obj = o);

  // interact with current html
  const getHtml = () => html;
  const setHtml = (element) => (html = element);

  // fill edit form with current obj's value
  const fillEditForm = () => {};

  //
  return {
    getObj,
    setObj,
    getHtml,
    setHtml,
  };
})();

const display = (() => {
  const library = document.querySelector('.library');

  const books = (arr) => {
    library.innerHTML = '';
    for (const book of arr) {
      library.appendChild(book.createHtml());
    }
  };

  return {
    books,
  };
})();

// Book's prototype
const proto = {
  createHtml() {
    const div = document.createElement('div');
    div.classList.add('book-container');

    const h2 = document.createElement('h2');
    h2.classList.add('book-title');
    h2.textContent = this.title;

    const h3Author = document.createElement('h3');
    h3Author.classList.add('book-author');
    h3Author.textContent = this.author;

    const h3Pages = document.createElement('h3');
    h3Pages.classList.add('pages');

    const spanCompleted = document.createElement('span');
    spanCompleted.classList.add('book-completed');
    spanCompleted.textContent = this.completed;

    const spanSlash = document.createElement('span');
    spanSlash.textContent = '/';

    const spanTotal = document.createElement('span');
    spanTotal.classList.add('book-total');
    spanTotal.textContent = this.total;

    h3Pages.appendChild(spanCompleted);
    h3Pages.appendChild(spanSlash);
    h3Pages.appendChild(spanTotal);

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn', 'book-button-edit');
    btnEdit.textContent = '✎';

    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btn', 'book-button-remove');
    btnRemove.textContent = '✖';

    const btnMinus = document.createElement('button');
    btnMinus.classList.add('btn', 'minus');
    btnMinus.textContent = '-';

    const btnCheck = document.createElement('button');
    btnCheck.classList.add('btn', 'check');
    btnCheck.textContent = '✓';

    const btnPlus = document.createElement('button');
    btnPlus.classList.add('btn', 'plus');
    btnPlus.textContent = '+';

    div.appendChild(h2);
    div.appendChild(h3Author);
    div.appendChild(h3Pages);
    div.appendChild(btnEdit);
    div.appendChild(btnRemove);
    div.appendChild(btnMinus);
    div.appendChild(btnCheck);
    div.appendChild(btnPlus);

    return this; // for methods chaining
  },
};

// Factory Function
const Book = (title, author, total, completed) => {
  return Object.assign(Object.create(proto), { title, author, total, completed });
};

//static storage methods
Book.get = function (name) {
  return localStorage.getItem(name) === null ? [] : JSON.parse(localStorage.getItem(name));
};

Book.set = function (name, arr) {
  localStorage.setItem(name, JSON.stringify(arr));
};

// books data
let data = [];
// let data = Book.get('books');

const wrapper = document.querySelector('.wrapper');
const formCtn = document.querySelector('.form-container');
const formWrapper = document.querySelector('.form-wrapper');
const plusBtn = document.querySelector('.plus-button');
const form = document.querySelector('.form-wrapper form');
const title = form.querySelector('.title');
const author = form.querySelector('.author');
const total = form.querySelector('.total-pages');
const completed = form.querySelector('.completed-pages');
const cancelBtn = form.querySelector('.cancel');
const addBtn = form.querySelector('.add');
const haveReadBtn = form.querySelector('.switch');
const warnText = form.querySelector('.warn');
const inputs = document.querySelectorAll('.inputs-container');

//show form when plus button is clicked
plusBtn.onclick = () => formCtn.classList.remove('none');

//hide form and reset all form values when we clicked on cancel button
cancelBtn.onclick = () => {
  formCtn.classList.add('none');
  resetForm();
};

//make completed pages equal to total pages when click have read button
haveReadBtn.onclick = (e) => (completed.value = total.value);

// submit with button
addBtn.onclick = (e) => form.submit();

// control number inputs
const ignoreDigits = (e) => {
  // ignore start with zero(s)
  if (e.target.value === '' && e.code === 'Digit0') {
    e.preventDefault();
    return;
  }
  // ignore when value > 1000000
  if (+e.target.value > 10e5) {
    e.target.value = 10e5;
    e.preventDefault();
    return;
  }
};

total.addEventListener('keydown', ignoreDigits);
completed.addEventListener('keydown', ignoreDigits);

form.addEventListener('submit', (e) => {
  console.log(e);
  const book = Book(title.value, author.value, total.value, completed.value);
  console.log(book);
  data.push(book);
  // Book.set('books', data);
  display.books(data);
});

//reset form to empty
function resetForm() {
  [title.value, author.value, total.value, completed.value] = ['', '', '', ''];
}

//
window.addEventListener('DOMContentLoaded', (e) => {});
