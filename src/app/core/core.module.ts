import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AlertComponent } from './components/alert/alert.component';
import { AccountModule } from './account/account.module';
import { HomeModule } from './components/home/home.module';


const components = [
  AlertComponent
];
@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountModule,
    HomeModule
  ],
  exports: [
    ...components
  ]
})
export class CoreModule { }
