import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewayRoutingModule } from './gateway-routing.module';
import { ListGatewayComponent } from './components/list/list-gateway.component';
import { HttpClientModule } from '@angular/common/http';
import { GatewayService } from './services/gateway.service';
import { ListPageModule } from '../shared/list-page/list-page.module';
import { AddGatewayComponent } from './components/add/add-gateway.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeviceService } from '../device/services/device.service';
import { EditGatewayComponent } from './components/edit/edit-gateway.component';


@NgModule({
  declarations: [
    ListGatewayComponent,
    AddGatewayComponent,
    EditGatewayComponent
  ],
  imports: [
    CommonModule,
    GatewayRoutingModule,
    ListPageModule,
    HttpClientModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    DeviceService,
    GatewayService
  ]
})
export class GatewayModule { }
