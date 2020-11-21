import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-item-dialog',
  templateUrl: './list-item-dialog.component.html',
  styles: [
  ]
})
export class ListItemDialogComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private readonly listService: ListService,
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<ListItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.editForm = fb.group({
        name: new FormControl(data.listItem.name),
        quantity: new FormControl(data.listItem.quantity),
        price: new FormControl(data.listItem.price || 0),
        barcode: new FormControl('') 
      });
    }
  
    set name (val) {
      this.editForm.get('name').setValue(val);
    }
    get name () {
      return this.editForm.get('name').value
    }

  set quantity (val) {
    this.editForm.get('quantity').setValue(val);
  }
  get quantity () {
    return this.editForm.get('quantity').value
  }
  
  set price (val) {
    this.editForm.get('price').setValue(val);
  }
  get price () {
    return this.editForm.get('price').value
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  addValue(step: number, input: HTMLInputElement) {
    input.value = String(Number(input.value) + (1 * step)) || '0';
  }

  addQuantity(step: number) {
    this.quantity = Number(this.quantity) + (1 * step) || '0';
  }

  addPrice(step: number) {
    this.price = Number(this.price) + (1 * step) || '0';
  }

  save() {
   this.data.listItem.name = this.name;
   this.data.listItem.price = this.price;
   this.data.listItem.quantity = this.quantity;
   this.listService.updateListItem(this.data.listId, this.data.listItem, this.data.type);
   this.dialogRef.close();
  }
}
