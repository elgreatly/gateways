import { GetDeviceResponse } from './get-device.response';

export class GetDevicesListResponse {
    count: number;
    devices: GetDeviceResponse[];

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
