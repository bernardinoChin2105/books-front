import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../shared/category';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'bs-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss']
})
export class BookEditorComponent implements OnInit {

  BookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    year: ['', [Validators.required, Validators.pattern(/^\d{4,4}$/)]],
    category: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<BookEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category[],
    private formBuilder: FormBuilder) {    
  }

  ngOnInit(): void {
    this.initializeComponents();
  }

  initializeComponents() {
    this.BookForm.get('title')?.setValue('')
    this.BookForm.get('author')?.setValue('')
    this.BookForm.get('year')?.setValue('')
    this.BookForm.get('category')?.setValue('')
  }
  
  onOkClick() {
    this.dialogRef.close({
        title: this.BookForm.get('title')?.value,
        author: this.BookForm.get('author')?.value,
        year: this.BookForm.get('year')?.value,
        category: this.BookForm.get('category')?.value
      });
  }
}