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

  // edit html base on form submit
  const editHtml = () => {};

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
      console.log(book.createHtml());
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
    btnEdit.addEventListener('click', (e) => {
      // do something
    });

    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btn', 'book-button-remove');
    btnRemove.textContent = '✖';
    btnRemove.addEventListener('click', (e) => {
      // do something
    });

    const btnMinus = document.createElement('button');
    btnMinus.classList.add('btn', 'minus');
    btnMinus.textContent = '-';
    btnMinus.addEventListener('click', (e) => {
      // do something
    });

    const btnCheck = document.createElement('button');
    btnCheck.classList.add('btn', 'check');
    btnCheck.textContent = '✓';
    btnCheck.addEventListener('click', (e) => {
      // do something
    });

    const btnPlus = document.createElement('button');
    btnPlus.classList.add('btn', 'plus');
    btnPlus.textContent = '+';
    btnPlus.addEventListener('click', (e) => {
      // do something
    });

    div.appendChild(h2);
    div.appendChild(h3Author);
    div.appendChild(h3Pages);
    div.appendChild(btnEdit);
    div.appendChild(btnRemove);
    div.appendChild(btnMinus);
    div.appendChild(btnCheck);
    div.appendChild(btnPlus);

    return div;
  },
};

// Factory Function
const Book = (title, author, total, completed) => {
  return Object.assign(Object.create(proto), { title, author, total, completed });
};

// books data
let data = [];

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

//reset form to empty
const resetForm = () => ([title.value, author.value, total.value, completed.value] = ['asd', 'asd', 123, 12]);

// toggle form display
const toggleFormCtn = () => (formCtn.classList.contains('none') ? formCtn.classList.remove('none') : formCtn.classList.add('none'));

//show form when plus button is clicked
plusBtn.addEventListener('click', (e) => toggleFormCtn());

//hide form and reset all form values when we clicked on cancel button
cancelBtn.addEventListener('click', (e) => {
  // form.reset();
  resetForm();
  toggleFormCtn();
});

//make completed pages equal to total pages when click have read button
haveReadBtn.addEventListener('click', (e) => (completed.value = total.value));

// submit with button
addBtn.addEventListener('click', (e) => form.submit());

// control number inputs
const ignoreDigits = (e) => {
  // ignore start with zero(s)
  if (e.target.value === '' && e.code === 'Digit0') {
    e.preventDefault();
    return;
  }
  // ignore when value > 1000000
  if (+e.target.value >= 10e5) {
    e.target.value = 10e5;
    e.preventDefault();
    return;
  }
};

total.addEventListener('keydown', ignoreDigits);
completed.addEventListener('keydown', ignoreDigits);

form.addEventListener('submit', (e) => {
  const book = Book(title.value, author.value, total.value, completed.value);

  data.push(book);

  display.books(data);

  toggleFormCtn();

  // form.reset();
  resetForm();
});
