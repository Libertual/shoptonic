import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListHomeComponent } from './list-home/list-home.component';
import { InvoiceComponent } from '../invoice/invoice.component';


const routes: Routes = [
  {
    path: '',
    component: ListHomeComponent
  },
  { path: ':listId/invoice',
    component: InvoiceComponent
  }
  // otherwise redirect to home

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
