import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemScannerDialogComponent } from './item-scanner-dialog.component';

describe('ItemScannerDialogComponent', () => {
  let component: ItemScannerDialogComponent;
  let fixture: ComponentFixture<ItemScannerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemScannerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemScannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
