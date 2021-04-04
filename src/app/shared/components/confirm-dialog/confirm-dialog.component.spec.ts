import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ConfirmDialogComponent } from './confirm-dialog.component';

class DialogRefMock {
  close() {
    return true;
  }
  getState() {
    return true;
  }
}
describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      declarations: [ 
        ConfirmDialogComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: new DialogRefMock() }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onDismiss', () => {
    component.onDismiss();
    expect(component.dialogRef.getState()).toBeTrue();
  });

  it('onDismiss', () => {
    component.onConfirm();
    expect(component.dialogRef.getState()).toBeTrue();
  });

});
