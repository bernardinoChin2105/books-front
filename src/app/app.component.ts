import { Component } from '@angular/core';
import { Book } from './books/shared/book';
import { BooksService } from './books/shared/books.service';
import { MatDialog } from '@angular/material/dialog';
import { BookRateComponent } from './books/book-rate/book-rate.component';
import { BookEditorComponent } from './books/book-editor/book-editor.component';
import { CategoriesService } from './books/shared/categories.service';
import { Category } from './books/shared/category';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  books: Book[] = [];
  categories: Category[] = [];
  title = '';
  category = '';

  constructor(
    private booksService: BooksService,
    private categoriesService: CategoriesService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
  }

  onFiltersChange(event: any) {
    this.title = event.title;
    this.category = event.category;
    this.getBooks(this.title, this.category);
  }

  onBookSelect(event: any) {
    this.openRateDialog(event);
  }

  getBooks(title: string = '', category: string = '') {
    this.booksService.getBooks(title, category).subscribe(response => {
      this.books = response;
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  openBookEditorDialog() {
    const dialogRef = this.dialog.open(BookEditorComponent, {
      width: '350px',
      data: this.categories
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return;

      this.booksService.postBook(result).subscribe(result => {
        this.getBooks(this.title, this.category);
      });
    });
  }

  openRateDialog(data: any) {
    const selectedBook = data;
    const dialogRef = this.dialog.open(BookRateComponent, {
      width: '350px',
      data: {
        bookId: selectedBook.id,
        rate: 5
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return;

      this.booksService.rateBook(selectedBook.id, result).subscribe(response => {
        this.getBooks(this.title, this.category);
      });
    });
  }
}