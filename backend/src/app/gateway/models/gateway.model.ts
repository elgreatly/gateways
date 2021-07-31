import { DeviceModel } from '../../device/models/device.model';
import { CreateGatewayRequestDto } from '../dto/Request/create-gateway.request';

export class GatewayModel {
    id?: number;
    serialNumber: string;
    name: string;
    ipv4: string;
    devicesIds: number[];
    devices: DeviceModel[];

    constructor(data?: any) {
        Object.assign(this, data);
    }

    adabt(gatewayDto: CreateGatewayRequestDto) {
        this.serialNumber = gatewayDto.serialNumber;
        this.name = gatewayDto.name;
        this.ipv4 = gatewayDto.ipv4;
        this.devicesIds = gatewayDto.devicesIds;

        return this;
    }
}
