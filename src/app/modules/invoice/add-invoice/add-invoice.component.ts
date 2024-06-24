import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileType, ListFile } from '@app/modules/list/list.model';
import { ListService } from '@app/modules/list/list.service';
import { FilesizePipe } from '@app/shared/pipes/filesize.pipe';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [ SharedModule, FilesizePipe ],
  templateUrl: './add-invoice.component.html',
  styles: ``
})
export class AddInvoiceComponent {
  fileToUpload: ListFile = null;
  currentFile?: File;

  constructor(
    private readonly listService: ListService,
    public dialogRef: MatDialogRef<AddInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

    /**
   * File upload on click
   *
   * @return response()
   */
    async onFileSelected(event:any) {
      if (event.target.files.length > 0) {
        const file: File = event.target.files[0];
        if (file) {
          this.currentFile = file;
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.fileToUpload = {
              file: e.target.result,
              type: FileType.TICKET,
              mimeType: file.type,
              date: new Date(),
              name: file.name,
              size: file.size
            };
          };
          reader.readAsDataURL(this.currentFile);
        }
      }
    }

  async save() {
    await this.listService.addFileToList(this.data.list._id , this.fileToUpload).subscribe({
      next: (res) => {
        this.data.files = res.data.files;
        this.listService.getUserLists(this.data.list._id);
        this.dialogRef.close(res);
      },
      error: (e) => console.error('Error en consola: ', e),
      complete: () => console.info('complete')
    });
  }
}
