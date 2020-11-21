import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { SharedModule } from '@app/shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import { ListHomeComponent } from './list-home/list-home.component';
import { ListItemDialogComponent } from './list-item-dialog/list-item-dialog.component';

@NgModule({
  declarations: [ListComponent, ListHomeComponent, ListItemDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ListRoutingModule
  ]
})
export class ListModule { }
