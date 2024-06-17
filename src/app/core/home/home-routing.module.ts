import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '@app/modules/list/list.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'scanner',
        loadChildren: () => import('@app/modules/scanner/scanner.module').then(m => m.ScannerModule)
      },
      {
        path: 'list',
        loadChildren: () => import('@app/modules/list/list.module').then(m => m.ListModule)
      },
      {
        path: 'list/:id',
        component: ListComponent
      },
      {
        path: 'finance',
        loadChildren: () => import('@app/modules/finance/finance.module').then(m => m.FinanceModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
