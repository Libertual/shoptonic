import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannerComponent } from './scanner.component';
import { SharedModule } from '../../shared/shared.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerRoutingModule } from './scanner-routing.module';
import { OpenFoodFactsModule } from '../open-food-facts/open-food-facts.module';

@NgModule({
  declarations: [
    ScannerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ZXingScannerModule,
    ScannerRoutingModule,
    OpenFoodFactsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScannerModule { }
