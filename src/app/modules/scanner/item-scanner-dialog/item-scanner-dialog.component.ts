import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { OpenFoodFactsService } from '../../open-food-facts/open-food-facts.service';

@Component({
  selector: 'app-item-scanner-dialog',
  templateUrl: './item-scanner-dialog.component.html',
  styles: [
  ]
})
export class ItemScannerDialogComponent implements OnInit {
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

  constructor(
    private OpenFoodFactsService: OpenFoodFactsService,
  ) {}
  
  ngOnInit(): void {
  }
  ngAfterViewInit() {

  }
  
  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.scannerEnabled = false;
    this.OpenFoodFactsService.getProductByBarcode(resultString).subscribe(data => {
      this.productResult = data.product;
    });
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
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

}
