import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GatewayRepository } from '../../shared/repositories/gateway.repository';
import { CreateDeviceRequestDto } from '../dto/Request/create-device.request';
import { DeviceModel } from '../models/device.model';
import { DeviceRepository } from '../repositories/device.repository';

@Injectable()
export class DeviceService {

    constructor(
        private deviceRepository: DeviceRepository,
        private gatewayRepository: GatewayRepository,
    ) {}

    async find(limit: number, offset: number): Promise<DeviceModel[]> {
        return await this.deviceRepository.find(limit, offset);
    }

    async count(): Promise<number> {
        return await this.deviceRepository.count();
    }

    async findById(id: number): Promise<DeviceModel> {
        return await this.deviceRepository.findById(id);
    }

    async findByIds(ids: number[]): Promise<DeviceModel[]> {
        return await this.deviceRepository.findByIds(ids);
    }

    async create(createDeviceDto: CreateDeviceRequestDto): Promise<void> {
        const deviceModel = new DeviceModel().adabt(createDeviceDto);
        await this.deviceRepository.create(deviceModel);
    }

    async delete(id: number): Promise<void> {
        const device = await this.deviceRepository.findById(id);

        if (!device) {
           throw new HttpException('device does not exists', HttpStatus.NOT_FOUND);
        }

        const gateways = await this.gatewayRepository.findByDeviceId(id, 1, 0);
        if (gateways.length) {
            throw new HttpException('you cannot delete device already used in gateway', HttpStatus.BAD_REQUEST);
        }
        await this.deviceRepository.delete(id);
    }
}
