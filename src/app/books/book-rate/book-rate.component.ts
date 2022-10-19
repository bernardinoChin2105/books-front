import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'bs-book-rate',
  templateUrl: './book-rate.component.html',
  styleUrls: ['./book-rate.component.scss']
})
export class BookRateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BookRateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.data.rate = 5;
  }

  ngOnInit(): void {
  }
  
  onOkClick() {
    this.dialogRef.close(this.data.rate);
  }
}