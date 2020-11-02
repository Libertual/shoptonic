import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ScannerComponent } from './modules/scanner/scanner.component';

const routes: Routes = [
//  {path: '', component: AppComponent},
  {
    path: 'scanner', 
    loadChildren: () => import('./modules/scanner/scanner.module').then(m => m.ScannerModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
