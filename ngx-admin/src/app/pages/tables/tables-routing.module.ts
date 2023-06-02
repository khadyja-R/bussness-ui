import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';
import { ClientListComponent } from './client/client-list.component';
import {ClientProjectListComponent} from './Client-Project-List/project-list.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProfileAffilatorComponent } from '../profile-affilator/profile-affilator.component';

const routes: Routes = [
  {
    path: 'Client',
    component: ClientListComponent,
  },
  {
    path: 'Projects',
    component: ProjectListComponent,
  },
  {
    path: 'projects/:id',
    component: ClientProjectListComponent,
  },
  {
    path:'edit-client/:id',
    component: EditClientComponent,
  },

  {
    path:'transaction',
    component: TransactionComponent
  },

  {
    path:'profile',
    component: ProfileAffilatorComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule {}

export const routedComponents = [TablesComponent, ClientListComponent,ClientProjectListComponent,EditClientComponent,ProjectListComponent, TransactionComponent];
