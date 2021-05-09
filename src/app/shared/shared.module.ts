import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ImageAttachComponent } from './components/image-attach/image-attach.component';
import { ListGalleryComponent } from './components/list-gallery/list-gallery.component';

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
    ImageAttachComponent,
    ListGalleryComponent
  ],
  providers: [
    DecimalPipe
  ]
})
export class SharedModule { }
