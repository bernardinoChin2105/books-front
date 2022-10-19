import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Category } from '../shared/category';

@Component({
  selector: 'bs-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit {  
  selectedTitle = '';
  selectedCategory = '';

  @Output() onFiltersChange = new EventEmitter();
  @ViewChild('title') inputTitle: any;
  @Input() categories:Category[]=[];

  constructor() { }

  ngOnInit(): void { }

  onSelectedTitleChange(event: any) {
    this.selectedTitle = event.target.value;
    this.emitFiltersChange();
  }

  onSelectedCategoryChange(event: any) {
    this.selectedCategory = event.value;
    this.emitFiltersChange();
  }

  onClear() {    
    this.inputTitle.nativeElement.value = '';
    this.selectedTitle = '';
    this.selectedCategory = '';    
    this.emitFiltersChange();
  }

  private emitFiltersChange(){
    this.onFiltersChange.emit({
      title: this.selectedTitle,
      category: this.selectedCategory
    });
  }
}
