import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ItemDTO } from '@app/modules/item/item.dto';
import { Item } from '@app/modules/item/item.model';
import { ItemService } from '@app/modules/item/item.service';
import { OpenFoodFactsService } from '@app/modules/open-food-facts/open-food-facts.service';
import { ScannerDialogComponent } from '@app/modules/scanner/item-scanner-dialog/scanner-dialog.component';
import { ListItem } from '../list-item.model';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-item-dialog',
  templateUrl: './list-item-dialog.component.html',
  styles: [
  ]
})
export class ListItemDialogComponent implements OnInit {
  listItem: ListItem;
  item: Item = { };
  editForm: FormGroup;
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly openFoodFactsService: OpenFoodFactsService,
    private readonly listService: ListService,
    private readonly itemService: ItemService,
    private readonly fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ListItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.item.barcode = '';
    if (data.listItem)
      this.listItem = data.listItem;
    if (data.listItem.itemId) {
      this.itemService.searchItemById(data.listItem.itemId).subscribe(item => {
        this.item = item;
        this.barcode = item.barcode;
      });
    }

    this.editForm = fb.group({
      name: new FormControl(data.listItem.name),
      quantity: new FormControl(data.listItem.quantity),
      price: new FormControl(data.listItem.price || 0),
      barcode: new FormControl({ value: data.listItem.barcode, disabled: data.listItem.barcode ? true : false })
    });
  }

  set name(val) {
    this.editForm.get('name').setValue(val);
  }
  get name() {
    return this.editForm.get('name').value
  }

  set quantity(val) {
    this.editForm.get('quantity').setValue(val);
  }
  get quantity() {
    return this.editForm.get('quantity').value
  }

  set price(val) {
    this.editForm.get('price').setValue(val);
  }
  get price() {
    return this.editForm.get('price').value
  }

  set barcode(val) {
    this.editForm.get('barcode').setValue(val);
  }
  get barcode() {
    return this.editForm.get('barcode').value
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
    this.data.listItem.barcode = this.barcode;
    this.listService.updateListItem(this.data.listId, this.data.listItem, this.data.type);
    const item: ItemDTO = {};
    item.name = this.name;
    item.price = this.price;
    this.itemService.updateItemPrice(this.data.listItem.itemId, item).subscribe();
    this.dialogRef.close();
  }

  openScanner() {
    const item = {};
    const dialogRef = this.dialog.open(ScannerDialogComponent);

    dialogRef.afterClosed().subscribe(barcode => {
      item ? this.processBarcode(barcode) : console.info('Botón cerrar pulsado');
    });
  }

  private async processBarcode(barcode: string) {
    this.barcode = barcode;
    let item: Item = await this.itemService.searchItemsByBarcode(barcode).toPromise();
    if (item) {
      this.snackBar.open(`El producto ya se encuentra en la base de datos con el nombre: ${item.name}`, 'Ok', {
        duration: 7000,
      });
    } else {
      const result = await this.openFoodFactsService.getProductByBarcode(barcode).toPromise();
      if(result.status !== 0) {
        const productResult = result.product;
        this.item.openFoodFactsProduct = productResult;
        this.item.barcode = barcode;

        this.itemService.updateItem(this.item).subscribe();
      }
    }
  }
}
