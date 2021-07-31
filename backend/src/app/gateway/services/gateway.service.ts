import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DeviceService } from '../../device/services/device.service';
import { CreateGatewayRequestDto } from '../dto/Request/create-gateway.request';
import { GatewayModel } from '../models/gateway.model';
import { GatewayRepository } from '../../shared/repositories/gateway.repository';

@Injectable()
export class GatewayService {

    constructor(
        private gatewayRepository: GatewayRepository,
        private deviceService: DeviceService,
    ) {}

    async find(limit: number, offset: number): Promise<GatewayModel[]> {
        const gateways = await this.gatewayRepository.find(limit, offset);
        // tslint:disable-next-line
        for (let i = 0; i < gateways.length; i++) {
            gateways[i].devices = await this.deviceService.findByIds(gateways[i].devicesIds);
        }
        return gateways;
    }

    async findById(id: number): Promise<GatewayModel> {
        const gateway = await this.gatewayRepository.findById(id);
        if (gateway) {
            gateway.devices = await this.deviceService.findByIds(gateway.devicesIds);
        }
        return gateway;
    }

    async findBySerialNumber(serialNumber: string): Promise<GatewayModel> {
        const gateway = await this.gatewayRepository.findBySerialNumber(serialNumber);
        if (gateway) {
            gateway.devices = await this.deviceService.findByIds(gateway.devicesIds);
        }
        return gateway;
    }

    async count(): Promise<number> {
        return await this.gatewayRepository.count();
    }

    async create(gatewayDto: CreateGatewayRequestDto): Promise<void> {
        const existingGateway = await this.gatewayRepository.findBySerialNumber(gatewayDto.serialNumber);
        if (existingGateway) {
            throw new HttpException('this serial number already exists', HttpStatus.BAD_REQUEST);
        }

        const decices = await this.deviceService.findByIds(gatewayDto.devicesIds);

        if (decices.length !== gatewayDto.devicesIds.length) {
            throw new HttpException('some of these devices invalid', HttpStatus.BAD_REQUEST);
        }

        const gatewayModel = new GatewayModel().adabt(gatewayDto);
        await this.gatewayRepository.create(gatewayModel);
    }

    async updateGatewayDevices(id: number, deviceIds: number[]): Promise<void> {
        const existingGateway = await this.gatewayRepository.findById(id);
        if (!existingGateway) {
            throw new HttpException('this gateway does not exist', HttpStatus.NOT_FOUND);
        }

        const decices = await this.deviceService.findByIds(deviceIds);

        if (decices.length !== deviceIds.length) {
            throw new HttpException('some of these devices invalid', HttpStatus.BAD_REQUEST);
        }

        await this.gatewayRepository.addDevices(id, deviceIds);
    }
}
