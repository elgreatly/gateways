import { deviceTypeEnum } from "../enums/device-type.enum";

export class DeviceModel {
    id!: number;
    vendor!: string;
    status!: deviceTypeEnum.ONLINE | deviceTypeEnum.OFFLINE;

    public constructor(init?: Partial<DeviceModel>) {
        Object.assign(this, init);
    }
}
