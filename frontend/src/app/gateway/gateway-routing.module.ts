import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGatewayComponent } from './components/add/add-gateway.component';
import { EditGatewayComponent } from './components/edit/edit-gateway.component';
import { ListGatewayComponent } from './components/list/list-gateway.component';

const routes: Routes = [
  { path: '', component: ListGatewayComponent },
  { path: 'add', component: AddGatewayComponent },
  { path: 'edit/:id', component: EditGatewayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatewayRoutingModule { }
