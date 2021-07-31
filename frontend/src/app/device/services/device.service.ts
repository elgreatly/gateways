import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DeviceListResponseModel } from '../models/device-list-response.model';
import { DeviceModel } from '../models/device.model';

@Injectable()
export class DeviceService {
  baseURL: string = `/api/v1/devices`
  constructor(
    private http: HttpClient,
  ) { }

  getDevices(limit: number = 10, offset: number = 0): Observable<DeviceListResponseModel> {
    return this.http.get<DeviceListResponseModel>(`${this.baseURL}?limit=${limit}&offset=${offset}`);
  }

  addDevice(device: DeviceModel): Observable<any> {
    return this.http.post(this.baseURL, device);
  }
}
