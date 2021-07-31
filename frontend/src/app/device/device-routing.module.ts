import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemBarComponent } from '../shared/item-bar/item-bar.component';
import { AddDeviceComponent } from './components/add/add-device.component';
import { ListDeviceComponent } from './components/list/list-device.component';

const routes: Routes = [
  { path: '', component: ListDeviceComponent },
  { path: 'add', component: AddDeviceComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
