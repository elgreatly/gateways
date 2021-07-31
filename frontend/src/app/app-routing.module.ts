import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'gateways', loadChildren: () => import('./gateway/gateway.module').then(m => m.GatewayModule) },
  { path: 'devices', loadChildren: () => import('./device/device.module').then(m => m.DeviceModule) },
  { path: '', redirectTo: 'gateways', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
