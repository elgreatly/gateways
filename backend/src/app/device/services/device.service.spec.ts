import { HttpException, HttpStatus } from '@nestjs/common';
import { GatewayModel } from '../../gateway/models/gateway.model';
import { DeviceStatusEnum } from '../enums/device-status.enum';
import { DeviceModel } from '../models/device.model';
import { DeviceService } from './device.service';

describe('DeviceService Tests', () => {

    let deviceService: DeviceService;

    const gatewayRepository: any  = {
        findByDeviceId: (deviceId: number, limit: number, offset: number) => {
            if (deviceId !== 2) { return []; }
            return [new GatewayModel({
                id: 1,
                serialNumber: '1s2d2',
                name: 'test 1',
                ipv4: '197.55.135.243',
                devicesIds: [1],
            })];
        },
    };

    const deviceRepository: any  = {
        findById: (id: number) => {
            if (id !== 1) { return null; }
            return new DeviceModel({
                id: 1,
                vendor: 'test 1',
                status: DeviceStatusEnum.ONLINE,
                createdAt: new Date('2021-07-28T22:18:41.055Z'),
            });
        },
        delete: (id: number) => null,
    };

    beforeEach(async () => {
        deviceService = new DeviceService(deviceRepository, gatewayRepository);
    });

    it('DeviceService should be defined', () => {
        expect(deviceService).toBeDefined();
    });

    it('should throw exception not found when delete not existing device', async () => {
        try {
            await deviceService.delete(2);
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe('device does not exists');
            expect(e.status).toBe(HttpStatus.NOT_FOUND);
        }
    });

    it('should throw exception when delete device already used in gateway', async () => {
        try {
            await deviceService.delete(1);
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe('you cannot delete device already used in gateway');
            expect(e.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it('should delete device successfully', async () => {
        const deletedDevice = await deviceService.delete(1);
        expect(deletedDevice).toBe(undefined);
    });
});
