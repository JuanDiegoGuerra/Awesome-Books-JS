export default class Book {
  constructor(title, author) {
    this.id = Math.random() * 100;
    this.title = title;
    this.author = author;
  }
}