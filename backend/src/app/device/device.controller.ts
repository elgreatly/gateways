import { Controller, Get, Post, Delete, HttpStatus, Query, Param, HttpException, Body } from '@nestjs/common';
import { CreateDeviceRequestDto } from './dto/Request/create-device.request';
import { GetDevicesQueryParams } from './dto/Request/get-devices-query-params.request';
import { GetDeviceResponse } from './dto/response/get-device.response';
import { GetDevicesListResponse } from './dto/response/get-device-list.response';
import { DeviceService } from './services/device.service';
import { ParseIntPipe } from '@nestjs/common';

@Controller('devices')
export class DeviceController {

   constructor(
      private deviceService: DeviceService,
   ) {}

   @Get('')
   async getDevices(@Query() getDevicesQueryParams: GetDevicesQueryParams): Promise<GetDevicesListResponse> {
      const devicesCount = await this.deviceService.count();
      const devices = await this.deviceService.find(getDevicesQueryParams.limit, getDevicesQueryParams.offset);

      return new GetDevicesListResponse({
         count: devicesCount,
         devices,
      });
   }

   @Get(':id')
   async getOne(@Param('id', ParseIntPipe) id: number): Promise<GetDeviceResponse> {
      const device = await this.deviceService.findById(id);

      if (!device) {
         throw new HttpException('device does not exists', HttpStatus.NOT_FOUND);
      }

      return new GetDeviceResponse({
         id: device.id,
         vendor: device.vendor,
         status: device.status,
         cteatedAt: device.createdAt,
      });
   }

   @Post('')
   async createDevice(@Body() createDeviceRequestDto: CreateDeviceRequestDto): Promise<string> {
      await this.deviceService.create(createDeviceRequestDto);
      return 'Device Created Successfully';
   }

   @Delete(':id')
   async deleteDevice(@Param('id', ParseIntPipe) id: number): Promise<string> {
      await this.deviceService.delete(id);
      return 'Device Deleted Successfully';
   }
}
