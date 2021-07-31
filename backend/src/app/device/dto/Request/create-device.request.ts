import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DeviceStatusEnum } from '../../enums/device-status.enum';

export class CreateDeviceRequestDto {

    @IsNotEmpty()
    @IsString()
    vendor: string;

    @IsNotEmpty()
    @IsEnum(DeviceStatusEnum, { message: 'status must be online or offline' })
    status: DeviceStatusEnum;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
