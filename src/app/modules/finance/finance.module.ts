import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance.component';
import { FinanceRoutingModule } from './finance-routing.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [FinanceComponent],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    ChartsModule
  ]
})
export class FinanceModule { }
