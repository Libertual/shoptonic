import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-scanner-dialog',
  templateUrl: './scanner-dialog.component.html',
  styles: [
  ]
})
export class ScannerDialogComponent {
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX ];
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent = new ZXingScannerComponent();
  data: any;
  scannerEnabled = true;
  isChecked = true;
  desiredDevice: MediaDeviceInfo = null;
  torch = false;

  camerasFound: MediaDeviceInfo[];
  camerasNotFound;
  //device: MediaDeviceInfo;
  error;
  failure;
  complete;
  productResult;

  checkoutForm;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = true;
  model:any;
  
  mostrar = '';
  constructor(public dialogRef: MatDialogRef<ScannerDialogComponent>) {}
  
  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    console.log('onCamerasFound', devices);
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  public async onCodeResult(resultString: string) {
    this.scannerEnabled = false;
    this.dialogRef.close(resultString);
    return;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  public toggleDevice() {
    console.log('ad', this.availableDevices, this.currentDevice);
    this.mostrar = 'mal';
    let index: number = this.availableDevices.indexOf(this.currentDevice);
    index === -1 ? index = 0: null;
    console.log('index', index );
    if (index === (this.availableDevices.length - 1)) {
      this.mostrar = 'vale igual ' + index;
      index = 0
    } else {
      this.mostrar = 'no vale ' + index;
       index++;
    }
    this.currentDevice = this.availableDevices[index];
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  onScanError(error) {
    this.error = error;
  }

  public close() {
    this.dialogRef.close();
  }
}
