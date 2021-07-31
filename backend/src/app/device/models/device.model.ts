import { CreateDeviceRequestDto } from '../dto/Request/create-device.request';
import { DeviceStatusEnum } from '../enums/device-status.enum';

export class DeviceModel {
    id?: number;
    vendor: string;
    createdAt: string;
    status: DeviceStatusEnum.ONLINE | DeviceStatusEnum.OFFLINE;

    constructor(data?: any) {
        Object.assign(this, data);
    }

    adabt(createDeviceDto: CreateDeviceRequestDto) {
        this.vendor = createDeviceDto.vendor;
        this.status = createDeviceDto.status;

        return this;
    }
}
