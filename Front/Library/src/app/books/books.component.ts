import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book = this.getNewBook(); // Initialize with a new book
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

  selectBook(book: Book): void {
    this.selectedBook = { ...book };
    this.isEditMode = true;
  }

  saveBook(book: Book): void {
    if (this.isEditMode) {
      this.bookService.updateBook(book.id!, book).subscribe(() => {
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
    this.bookService.deleteBook(book.id!).subscribe(() => {
      this.loadBooks();
    });
  }

  cancelEdit(): void {
    this.selectedBook = this.getNewBook();
    this.isEditMode = false;
  }

  private getNewBook(): Book {
    return {
      title: '',
      author: '',
      genre: '',
      year_published: new Date().getFullYear()
    };
  }
}
