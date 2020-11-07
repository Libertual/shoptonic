import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const accountModule = () => import('./core/account/account.module').then(x => x.AccountModule);
const homeModule = () => import('./core/home/home.module').then(x => x.HomeModule);

const routes: Routes = [
//  {path: '', component: AppComponent},
  {
    path: '',
    loadChildren: homeModule,
    canActivate: [AuthGuard]
  },
  { path: 'account', loadChildren: accountModule },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }