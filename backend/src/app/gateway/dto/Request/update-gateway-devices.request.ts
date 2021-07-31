import { ArrayMaxSize, IsArray, IsOptional } from 'class-validator';

export class UpdateGatewayDevicesRequestDto {
    @IsArray()
    @ArrayMaxSize(10)
    @IsOptional()
    devicesIds: number[];

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
