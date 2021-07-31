import { Injectable, Logger } from '@nestjs/common';
import { CreateDeviceRequestDto } from '../device/dto/Request/create-device.request';
import { DeviceStatusEnum } from '../device/enums/device-status.enum';
import { DeviceService } from '../device/services/device.service';
import { CreateGatewayRequestDto } from '../gateway/dto/Request/create-gateway.request';
import { GatewayService } from '../gateway/services/gateway.service';

@Injectable()
export class Seeder {
    constructor(
        private readonly logger: Logger,
        private gatewayService: GatewayService,
        private deviceService: DeviceService,
    ) {}
    async seed() {
        try {
            const gateway = await this.gatewayService.findBySerialNumber('gateway1');
            if (!gateway) {
                await this.seedDevices();
                await this.seedGateways();
                this.logger.debug('Successfuly completed seeding...');
            } else {
                this.logger.error('you already seeded data...');
            }
        } catch (e) {
            this.logger.error('Failed seeding...');
        }
    }

    async seedDevices() {
        const devices = [
            new CreateDeviceRequestDto({
                vendor: 'vendor 1',
                status: DeviceStatusEnum.ONLINE,
            }),
            new CreateDeviceRequestDto({
                vendor: 'vendor 2',
                status: DeviceStatusEnum.ONLINE,
            }),
            new CreateDeviceRequestDto({
                vendor: 'vendor 3',
                status: DeviceStatusEnum.ONLINE,
            }),
            new CreateDeviceRequestDto({
                vendor: 'vendor 4',
                status: DeviceStatusEnum.ONLINE,
            }),
            new CreateDeviceRequestDto({
                vendor: 'vendor 5',
                status: DeviceStatusEnum.ONLINE,
            }),
        ];
        await this.deviceService.create(devices[0]);
        await this.deviceService.create(devices[1]);
        await this.deviceService.create(devices[2]);
        await this.deviceService.create(devices[3]);
        await this.deviceService.create(devices[4]);
    }

    async seedGateways() {
        const devicesIds = (await this.deviceService.find(10, 0)).map(device => device.id);
        const gateways = [
            new CreateGatewayRequestDto({
                serialNumber: 'gateway1',
                name: 'Gateway 1',
                ipv4: '197.55.135.243',
                devicesIds: devicesIds.sort(() => 0.5 - Math.random()).slice(0, 3),
            }),
            new CreateGatewayRequestDto({
                serialNumber: 'gateway2',
                name: 'Gateway 2',
                ipv4: '197.55.135.243',
                devicesIds: devicesIds.sort(() => 0.5 - Math.random()).slice(0, 2),
            }),
            new CreateGatewayRequestDto({
                serialNumber: 'gateway3',
                name: 'Gateway 3',
                ipv4: '197.55.135.243',
                devicesIds: devicesIds.sort(() => 0.5 - Math.random()).slice(0, 1),
            }),
            new CreateGatewayRequestDto({
                serialNumber: 'gateway4',
                name: 'Gateway 4',
                ipv4: '197.55.135.243',
                devicesIds: devicesIds.sort(() => 0.5 - Math.random()).slice(0, 4),
            }),
            new CreateGatewayRequestDto({
                serialNumber: 'gateway5',
                name: 'Gateway 5',
                ipv4: '197.55.135.243',
                devicesIds: devicesIds.sort(() => 0.5 - Math.random()).slice(0, 3),
            }),
        ];
        await this.gatewayService.create(gateways[0]);
        await this.gatewayService.create(gateways[1]);
        await this.gatewayService.create(gateways[2]);
        await this.gatewayService.create(gateways[3]);
        await this.gatewayService.create(gateways[4]);
    }
}
