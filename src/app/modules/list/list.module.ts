import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { SharedModule } from '@app/shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import { ListHomeComponent } from './list-home/list-home.component';
import { ListItemDialogComponent } from './list-item-dialog/list-item-dialog.component';
import { ListEditComponent } from './list-home/edit/list-edit.component';
import { ShareComponent } from './share/share.component';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { ImageAttachComponent } from '@app/shared/components/image-attach/image-attach.component';

@NgModule({
  declarations: [
    ListComponent,
    ListHomeComponent,
    ListItemDialogComponent,
    ListEditComponent,
    ShareComponent,
    // ConfirmDialogComponent,
    // ImageAttachComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListRoutingModule
  ]
})
export class ListModule { }
