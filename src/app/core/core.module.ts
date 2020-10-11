import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const components = [
  NavigationBarComponent,
  SidenavComponent
];
@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ...components
  ]
})
export class CoreModule { }
