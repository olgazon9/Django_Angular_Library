import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  isEditMode = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  selectBook(book: Book | null): void {
    if (book) {
      this.selectedBook = { ...book };
    } else {
      // Initialize a new book with default values
      this.selectedBook = {
        title: '',
        author: '',
        genre: '',
        year_published: new Date().getFullYear() // or some default value
      };
    }
    this.isEditMode = true;
  }

  saveBook(book: Book): void {
    if (book && book.id) {
      this.bookService.updateBook(book.id, book).subscribe(() => {
        this.loadBooks();
      });
    } else {
      this.bookService.createBook(book).subscribe(() => {
        this.loadBooks();
      });
    }
    this.cancelEdit();
  }

  deleteBook(book: Book): void {
    if (book && book.id) {
      this.bookService.deleteBook(book.id).subscribe(() => {
        this.loadBooks();
      });
    }
  }

  cancelEdit(): void {
    this.selectedBook = null;
    this.isEditMode = false;
  }
}
