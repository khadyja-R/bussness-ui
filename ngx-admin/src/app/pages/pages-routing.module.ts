import { RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { ProfileAffilatorComponent } from './profile-affilator/profile-affilator.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },

    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },




    {
      path: 'profile/:email',
      component: ProfileAffilatorComponent,
    },

   
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
