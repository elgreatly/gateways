import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemModel } from 'src/app/shared/item-bar/models/item.model';
import { DeviceModel } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-list-device',
  templateUrl: './list-device.component.html',
  styleUrls: ['./list-device.component.scss']
})
export class ListDeviceComponent {

  devices: DeviceModel[] = [];
  items: ItemModel[] = [];
  totalCount: number = 0; 

  constructor (
    private deviceService: DeviceService,
    private router: Router
  ) {
    this.getDevices();
  }

  addDevice() {
    this.router.navigate(['/devices/add']);
  }

  pageChanged(page: number) {
    const limit = 10;
    const offset = (page - 1) * limit
    this.getDevices(limit, offset);
  }

  private getDevices(limit: number = 10, offset: number = 0) {
    this.deviceService.getDevices(limit, offset).subscribe(response => {
      this.devices = response.data.devices;
      this.totalCount = response.data.count;
      
      this.items = this.devices.map(device => {
        return new ItemModel({
          id: device.id,
          name: device.vendor
        })
      });
    });
  }
}
