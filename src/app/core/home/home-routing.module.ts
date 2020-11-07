import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScannerComponent } from '@app/modules/scanner/scanner.component';
import { ScannerModule } from '@app/modules/scanner/scanner.module';
import { AuthGuard } from '@app/shared/guards/auth.guard';
import { HomeComponent } from './home.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      { 
        path: 'scanner',
        loadChildren: () => import('@app/modules/scanner/scanner.module').then(m => m.ScannerModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }