import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { NavigationBarComponent } from '@core/components/home/navigation-bar/navigation-bar.component';
import { SidenavComponent } from '@core/components/home/sidenav/sidenav.component';
import { AlertComponent } from '@core/components/alert/alert.component';
import { AccountModule } from '@core/account/account.module';
import { HomeComponent } from '@core/components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';


const components = [
  NavigationBarComponent,
  SidenavComponent
];
@NgModule({
  declarations: [
    ...components,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    ...components
  ]
})
export class HomeModule { }