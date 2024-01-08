import { Component, OnInit } from '@angular/core';
import { Book, BooksService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book = this.getNewBook();
  isEditMode = false;
  isLoading = false;

  constructor(private booksService: BooksService) {
    console.log('BooksComponent constructed');
  }

  ngOnInit(): void {
    console.log('BooksComponent initialized');
    this.loadBooks();
  }

  loadBooks(): void {
    console.log('Loading books');
    this.isLoading = true;
    this.booksService.getBooks().subscribe(
      data => {
        console.log('Books loaded:', data);
        this.books = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      }
    );
  }

  selectBook(book: Book): void {
    console.log('Selecting book:', book);
    this.selectedBook = { ...book };
    this.isEditMode = true;
  }

  saveBook(book: Book): void {
    console.log('Saving book:', book);
    this.isLoading = true;
    const operation = this.isEditMode
      ? this.booksService.updateBook(book.id!, book)
      : this.booksService.createBook(book);

    operation.subscribe(
      () => {
        console.log('Operation successful, reloading books');
        this.loadBooks();
      },
      error => {
        console.error('Error during save operation:', error);
        this.isLoading = false;
      }
    );
    this.cancelEdit();
  }

  deleteBook(book: Book): void {
    console.log('Deleting book:', book);
    this.isLoading = true;
    this.booksService.deleteBook(book.id!).subscribe(
      () => {
        console.log('Book deleted successfully, reloading books');
        this.loadBooks();
      },
      error => {
        console.error('Error deleting book:', error);
        this.isLoading = false;
      }
    );
  }

  cancelEdit(): void {
    console.log('Cancelling edit');
    this.selectedBook = this.getNewBook();
    this.isEditMode = false;
  }

  private getNewBook(): Book {
    console.log('Creating new book template');
    return {
      title: '',
      author: '',
      genre: '',
      year_published: new Date().getFullYear()
    };
  }
}
