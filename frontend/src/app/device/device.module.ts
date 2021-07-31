import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceRoutingModule } from './device-routing.module';
import { ListDeviceComponent } from './components/list/list-device.component';
import { HttpClientModule } from '@angular/common/http';
import { DeviceService } from './services/device.service';
import { ListPageModule } from '../shared/list-page/list-page.module';
import { AddDeviceComponent } from './components/add/add-device.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListDeviceComponent,
    AddDeviceComponent
  ],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    ListPageModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DeviceService
  ]
})
export class DeviceModule { }
