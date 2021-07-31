import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetDevicesQueryParams {

    @IsNumber()
    @IsOptional()
    @Transform(limit => parseInt(limit, 10))
    limit: number = 10;

    @IsNumber()
    @IsOptional()
    @Transform(offset => parseInt(offset, 10))
    offset: number = 0;
}
