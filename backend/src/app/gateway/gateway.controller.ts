import { Controller, Get, Post, Put, HttpStatus, Query, Param, ParseIntPipe, HttpException, Body } from '@nestjs/common';
import { CreateGatewayRequestDto } from './dto/Request/create-gateway.request';
import { GetGatewaysQueryParams } from './dto/Request/get-gateways-query-params.request';
import { UpdateGatewayDevicesRequestDto } from './dto/Request/update-gateway-devices.request';
import { GetGatewayResponse } from './dto/response/get-gateway.response';
import { GetGatewaysListResponse } from './dto/response/get-gateways-list.response';
import { GatewayService } from './services/gateway.service';

@Controller('gateways')
export class GatewayController {

    constructor(
        private gatewayService: GatewayService,
    ) {}

    @Get('')
    async getGateways(@Query() getGatewaysQueryParams: GetGatewaysQueryParams): Promise<GetGatewaysListResponse> {
        const gatewaysCount = await this.gatewayService.count();
        const gateways = await this.gatewayService.find(getGatewaysQueryParams.limit, getGatewaysQueryParams.offset);

        return new GetGatewaysListResponse({
            count: gatewaysCount,
            gateways: gateways.map(gateway => {
                return new GetGatewayResponse({
                    id: gateway.id,
                    serialNumber: gateway.serialNumber,
                    name: gateway.name,
                    devices: gateway.devices,
                });
            }),
        });
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetGatewayResponse> {
        const gateway = await this.gatewayService.findById(id);

        if (!gateway) {
            throw new HttpException('this gateway does not exists', HttpStatus.NOT_FOUND);
        }

        return new GetGatewayResponse({
            id: gateway.id,
            serialNumber: gateway.serialNumber,
            name: gateway.name,
            devices: gateway.devices,
        });
    }

    @Post('')
    async createGateway(@Body() createGatewayRequestDto: CreateGatewayRequestDto): Promise<string> {
        await this.gatewayService.create(createGatewayRequestDto);
        return 'Gateway Created Successfully';
    }

    @Put(':id')
    async updateGatewayDevices(@Param('id', ParseIntPipe) id: number, @Body() updateGatewayDevicesRequestDto: UpdateGatewayDevicesRequestDto)
    : Promise<string> {
        await this.gatewayService.updateGatewayDevices(id, updateGatewayDevicesRequestDto.devicesIds);
        return 'Gateway Devices Updated Successfully';
    }
}
