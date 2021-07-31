import { ArrayMaxSize, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ISVlaidIPv4 } from '../../../../infrastructure/custom-validators/is-valid-ip.validator';

export class CreateGatewayRequestDto {

    @IsNotEmpty()
    @IsString()
    serialNumber: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @ISVlaidIPv4({ message: 'Invalid IP address' })
    ipv4: string;

    @IsArray()
    @ArrayMaxSize(10)
    @IsOptional()
    devicesIds: number[];

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
