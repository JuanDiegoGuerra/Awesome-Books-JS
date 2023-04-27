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



