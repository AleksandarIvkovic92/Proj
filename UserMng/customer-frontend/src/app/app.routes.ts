import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list';
import { CustomerAddComponent } from './components/customer-add/customer-add';


export const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
  },
  {
    path: 'customers/edit/:id',
    loadComponent: () =>
      import('./components/customer-edit/customer-edit').then(
        (m) => m.CustomerEditComponent
      ),
  },
  {
    path: 'customers/add',
    loadComponent: () =>
      import('./components/customer-add/customer-add').then(
        (m) => m.CustomerAddComponent
      ),
  }

];

