import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [NavigationBarComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [NavigationBarComponent]
})
export class CoreModule { }
