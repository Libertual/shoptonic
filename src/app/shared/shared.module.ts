import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ImageAttachComponent } from './components/image-attach/image-attach.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    ImageAttachComponent
  ],
  declarations: [
    ConfirmDialogComponent,
    ImageAttachComponent
  ]
})
export class SharedModule { }
