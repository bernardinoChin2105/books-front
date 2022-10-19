import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  @Input('dataSource') books: Book[] = [];
  displayedColumns=[
    'id', 
    'title', 
    'author', 
    'year', 
    'category', 
    'rateAverage',
    'actions'
  ];  

  @Output() bookClick = new EventEmitter();

  constructor() { }

  onBookSelected(data: any) {
    this.bookClick.emit(data);
  }
}
