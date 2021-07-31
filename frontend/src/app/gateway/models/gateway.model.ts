import { DeviceModel } from "src/app/device/models/device.model";

export class GatewayModel {
    id?: number;
    serialNumber!: string;
    name!: string;
    ipv4!: string;
    devicesIds?: number[];
    devices!: DeviceModel[];

    public constructor(init?: Partial<GatewayModel>) {
        Object.assign(this, init);
    }
}
