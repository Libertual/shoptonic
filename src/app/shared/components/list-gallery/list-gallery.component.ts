import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-gallery',
  templateUrl: './list-gallery.component.html',
  styles: [
  ]
})
export class ListGalleryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
