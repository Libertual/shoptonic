import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { SidenavComponent } from '../home/sidenav/sidenav.component';
import { AuthGuard } from '@app/shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'confirm', component: ConfirmComponent },
    ]
  },
  { path: 'settings', component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: SettingsComponent },
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
