import Book from './book.js';

let Books = JSON.parse(localStorage.getItem('Books')) ?? [];

class Library {
  constructor(book) {
    this.book = book;
  }

  addBook() {
    Books.push(this.book);
    localStorage.setItem('Books', JSON.stringify(Books));
  }

  removeBook() {
    Books = Books.filter((bookObj) => bookObj.id !== this.book.id);
    localStorage.setItem('Books', JSON.stringify(Books));
  }
}

function displayBook() {
  const bookListDiv = document.querySelector('.book-list');
  bookListDiv.innerHTML = '';
  const bookList = document.createElement('ul');
  Books.forEach((element, idx) => {
    const li = document.createElement('li');
    li.setAttribute('id', element.id);
    li.innerHTML = `
    <p> "${element.title}" By ${element.author} </p> 
    `;
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.addEventListener('click', () => {
      const library = new Library(element);
      library.removeBook();
      li.remove();
      displayBook();
    });
    li.appendChild(removeBtn);
    if (idx % 2 === 0) {
      li.classList.add('dark');
    } else {
      li.classList.add('light');
    }
    bookList.appendChild(li);
  });
  bookListDiv.appendChild(bookList);
}

const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('book-title').value;
  // Capitalize first letter of title value
  const titleUC = title.charAt(0).toUpperCase() + title.slice(1);
  const author = document.getElementById('book-author').value;
  const arrAuthor = author.split(' ');
  // Capitalize first letter of each word of author value
  for (let i = 0; i < arrAuthor.length; i += 1) {
    arrAuthor[i] = arrAuthor[i].charAt(0).toUpperCase() + arrAuthor[i].slice(1);
  }
  const authorUC = arrAuthor.join(' ');
  if ((title && author) !== '') {
    const book = new Book(titleUC, authorUC);
    const library = new Library(book);
    library.addBook();
    form.reset();
    displayBook();
  }
});

// NAVBAR LINKS

// List - Link
const bookList = document.querySelector('.book-list-container');
const listBtn = document.querySelector('.navList');
const formContainer = document.querySelector('.form');
// Add New - Link
const addNewBtn = document.querySelector('.navNew');
// Contact - Link
const contactBtn = document.querySelector('.navContact');
const contactInfo = document.querySelector('.contact');

listBtn.addEventListener('click', () => {
  bookList.style.display = 'block';
  formContainer.style.display = 'none';
  contactInfo.style.display = 'none';
  displayBook();
});

window.addEventListener('load', () => {
  bookList.style.display = 'none';
  formContainer.style.display = 'none';
  contactInfo.style.display = 'none';
});

addNewBtn.addEventListener('click', () => {
  bookList.style.display = 'none';
  formContainer.style.display = 'block';
  contactInfo.style.display = 'none';
});

contactBtn.addEventListener('click', () => {
  bookList.style.display = 'none';
  formContainer.style.display = 'none';
  contactInfo.style.display = 'block';
});

