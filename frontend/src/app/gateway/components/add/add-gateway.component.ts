import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/device/services/device.service';
import { ItemModel } from 'src/app/shared/item-bar/models/item.model';
import { GatewayModel } from '../../models/gateway.model';
import { GatewayService } from '../../services/gateway.service';

@Component({
  selector: 'app-add-gateway',
  templateUrl: './add-gateway.component.html',
  styleUrls: ['./add-gateway.component.scss']
})
export class AddGatewayComponent {

  gatewayForm: any;
  items: ItemModel[] = [];
  formSubmitting: boolean = false;
  
  constructor (
    private gatewayService: GatewayService,
    private deviceService: DeviceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.gatewayForm = this.fb.group({
      serialNumber: ['', Validators.required],
      name: ['', Validators.required],
      ipv4: ['', Validators.required],
      devicesIds: [[], Validators.maxLength(10)]
    });

    this.deviceService.getDevices().subscribe(response => {
      this.items = response.data.devices.map(device => {
        return new ItemModel({
          id: device.id,
          name: device.vendor
        })
      })
    });
  }

  onSubmit() {
    this.formSubmitting = true;
    const gateway = new GatewayModel({
      serialNumber: this.gatewayForm.value.serialNumber,
      name: this.gatewayForm.value.name,
      ipv4: this.gatewayForm.value.ipv4,
      devicesIds: this.gatewayForm.value.devicesIds,
    });
    
    this.gatewayService.addGateway(gateway).subscribe(response => {
      this.formSubmitting = false;
      if (response.status === 201) {
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
