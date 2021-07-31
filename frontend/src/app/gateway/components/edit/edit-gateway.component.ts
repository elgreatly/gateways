import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/device/services/device.service';
import { ItemModel } from 'src/app/shared/item-bar/models/item.model';
import { GatewayModel } from '../../models/gateway.model';
import { GatewayService } from '../../services/gateway.service';

@Component({
  selector: 'app-edit-gateway',
  templateUrl: './edit-gateway.component.html',
  styleUrls: ['./edit-gateway.component.scss']
})
export class EditGatewayComponent {

  gatewayForm: any;
  items: ItemModel[] = [];
  formSubmitting: boolean = false;
  gatewayId!: number;
  
  constructor (
    private gatewayService: GatewayService,
    private deviceService: DeviceService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.gatewayForm = this.fb.group({
      devicesIds: [[], Validators.maxLength(10)]
    });

    this.activatedRoute.params.subscribe(params => {
      this.gatewayId = params['id'];
    });

    this.deviceService.getDevices().subscribe(response => {
      this.items = response.data.devices.map(device => {
        return new ItemModel({
          id: device.id,
          name: device.vendor
        })
      })
    });

    this.gatewayService.getGateway(this.gatewayId).subscribe(response => {
      this.gatewayForm.controls.devicesIds.setValue(response.data.devices.map(device => device.id));
    });
  }

  onSubmit() {
    this.formSubmitting = true;
    const gateway = new GatewayModel({
      devicesIds: this.gatewayForm.value.devicesIds,
    });
    
    this.gatewayService.editGatewayDevices(this.gatewayId, gateway).subscribe(response => {
      this.formSubmitting = false;
      if (response.status === 200) {
        this.router.navigate(['/gateways']);
      } else {
        alert('something went wrong');
      }
    },
    error => {
      this.formSubmitting = false;
      const messages = error.error.errors ? error.error.errors[0].message[0] : error.error.message;
      alert(messages);
    });
  }
}
