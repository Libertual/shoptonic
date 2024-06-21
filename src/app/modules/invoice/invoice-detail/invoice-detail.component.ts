import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from '@app/modules/item/item.service';
import { ScannerDialogComponent } from '@app/modules/scanner/item-scanner-dialog/scanner-dialog.component';
import { SharedModule } from '@app/shared/shared.module';
import { InvoiceLine } from '../invoice.model';
import { OpenFoodFactsService } from '@app/modules/open-food-facts/open-food-facts.service';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './invoice-detail.component.html',
  styles: ``
})
export class InvoiceDetailComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<InvoiceDetailComponent>,
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.trace('data: ', this.data.invoice);
  }

  /**
   * Open scanner embebed app
   */
  public openScanner(line: InvoiceLine) {
    const item = {};
    const dialogRef = this.dialog.open(ScannerDialogComponent);

    dialogRef.afterClosed().subscribe((barcode) => {
      if (barcode) {
        line.barcode = barcode;
        this.processBarcode(this.data.invoice._id, line);
      } else {
        console.info('Botón cerrar pulsado');
      }
    });
  }

  /**
   * Process barcode data on list
   * @param barcode
   * @returns
   */
  private async processBarcode(invoiceId: string, line: InvoiceLine) {
    this.snackBar.open('Codigo de barras: ' + line.barcode, 'Close', {
      duration: 3000
    });
    await this.itemService.setInvoiceLineBarcode(invoiceId, line).subscribe( res => {
      line = res.data;
    });
    }
}
