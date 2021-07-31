import { GetDeviceResponse } from '../../../device/dto/response/get-device.response';

export class GetGatewayResponse {
    id: string;
    serialNumber: string;
    name: string;
    devices: GetDeviceResponse[];

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
