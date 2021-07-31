import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { DeviceModel } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';
import { FormBuilder } from '@angular/forms';
import { deviceTypeEnum } from '../../enums/device-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent {

  deviceForm: any;
  formSubmitting: boolean = false;
  
  constructor (
    private deviecService: DeviceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.deviceForm = this.fb.group({
      vendor: ['', Validators.required],
      status: [false, Validators.required]
    });
  }

  onSubmit() {
    this.formSubmitting = true;
    const device = new DeviceModel({
      vendor: this.deviceForm.value.vendor,
      status: this.deviceForm.value.status ? deviceTypeEnum.ONLINE : deviceTypeEnum.OFFLINE
    })
    this.deviecService.addDevice(device).subscribe(response => {
      this.formSubmitting = false;
      this.router.navigate(['/devices']);
    });
  }
}
