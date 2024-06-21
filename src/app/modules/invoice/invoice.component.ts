import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../list/list.service';
import { List } from '../list/list.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [ SharedModule, CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  list: List;
  dialogRef: MatDialogRef<AddInvoiceComponent>;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly listService: ListService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.listService.list.subscribe(list => {
        if(list) {
          this.list = list;
        } else {
          this.listService.getUserLists(params.listId);
        }
      })
    });

  }

  onInvoiceClick (invoice) {
     const dialogRef = this.dialog.open(InvoiceDetailComponent, {
      autoFocus: false,
      data: {invoice}
    })
  }
  addInvoice() {
    this.dialogRef = this.dialog.open(AddInvoiceComponent, {
     autoFocus: false,
     data: { list: this.list }
    });

    this.dialogRef.afterClosed().subscribe( data => {
      //console.log('Dialog closed: ', data);
    })
 }
}
