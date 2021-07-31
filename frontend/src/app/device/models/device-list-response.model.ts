import { DeviceModel } from "./device.model";

export class DeviceListResponseModel {
    data!: {
        count: number;
        devices: DeviceModel[];
    };

    public constructor(init?: Partial<DeviceListResponseModel>) {
        Object.assign(this, init);
    }
}
