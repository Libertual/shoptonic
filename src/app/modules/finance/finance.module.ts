import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance.component';
import { FinanceRoutingModule } from './finance-routing.module';

import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [FinanceComponent],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    //ChartsModule,
    SharedModule
  ]
})
export class FinanceModule { }
