import { HttpException, HttpStatus } from '@nestjs/common';
import { DeviceStatusEnum } from '../../device/enums/device-status.enum';
import { DeviceModel } from '../../device/models/device.model';
import { CreateGatewayRequestDto } from '../dto/Request/create-gateway.request';
import { GatewayModel } from '../models/gateway.model';
import { GatewayService } from './gateway.service';

describe('GatewayService Tests', () => {
    let gatewayService: GatewayService;

    const gatewayRepository: any  = {
        find: (limit: number, offset: number) => {
            return [new GatewayModel({
                id: 1,
                serialNumber: '1s2d2',
                name: 'test 1',
                ipv4: '197.55.135.243',
                devicesIds: [1],
            })];
        },
        count: () => {
            return 5;
        },
        findBySerialNumber: (serialNumber: string) => {
            if (serialNumber !== '1s2d2') { return null; }
            return new GatewayModel({
                id: 1,
                serialNumber: '1s2d2',
                name: 'test 1',
                ipv4: '197.55.135.243',
                devicesIds: [1, 2],
            });
        },
        findById: (id: number) => {
            if (id !== 1) { return null; }
            return new GatewayModel({
                id: 1,
                serialNumber: '1s2d2',
                name: 'test 1',
                ipv4: '197.55.135.243',
                devicesIds: [1, 2],
            });
        },
        findByDeviceId: (deviceId: number, limit: number, offset: number) => {
            if (deviceId !== 1 && deviceId !== 2 ) { return []; }
            return [new GatewayModel({
                id: 1,
                serialNumber: '1s2d2',
                name: 'test 1',
                ipv4: '197.55.135.243',
                devicesIds: [1],
            })];
        },
        addDevices: (id: number, devicesIds: number[]) => null,
        create: (gatewayModel: GatewayModel) => null,
    };

    const deviceService: any  = {
      findByIds: (ids: number[]) => {
          if (ids[0] !== 1) { return []; }
          return [new DeviceModel({
              id: 1,
              vendor: 'test 1',
              status: DeviceStatusEnum.ONLINE,
              createdAt: new Date('2021-07-28T22:18:41.055Z'),
          })];
      },
    };

    beforeEach(async () => {
        gatewayService = new GatewayService(gatewayRepository, deviceService);
    });

    it('GatewayService should be defined', () => {
        expect(gatewayService).toBeDefined();
    });

    it('should return device parameter in gateway model when find gateways from database ', async () => {
        const gateways = await gatewayService.find(10, 0);
        expect(gateways[0].devices[0].id).toBe(1);
    });

    it('should return device parameter in gateway model when find single gateway by id ', async () => {
        const gateway = await gatewayService.findById(1);
        expect(gateway.devices[0].id).toBe(1);
    });

    it('should return null if the gateway does not found when find by id', async () => {
        const gateway = await gatewayService.findById(2);
        expect(gateway).toBe(null);
    });

    it('should throw exception duplicate when serial number already exists in create gateway', async () => {
        const gateway = new CreateGatewayRequestDto({
            serialNumber: '1s2d2',
            name: 'test 1',
            ipv4: '197.55.135.243',
            devicesIds: [1],
        });
        try {
            await gatewayService.create(gateway);
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe('this serial number already exists');
            expect(e.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it('should throw exception for devices ids when some devices not exists in the database in create gateway', async () => {
        const gateway = new CreateGatewayRequestDto({
            serialNumber: '1s2d1',
            name: 'test 1',
            ipv4: '197.55.135.243',
            devicesIds: [2],
        });
        try {
            await gatewayService.create(gateway);
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe('some of these devices invalid');
            expect(e.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it('should create gateway successfully', async () => {
        const gateway = new CreateGatewayRequestDto({
            serialNumber: '1s2d1',
            name: 'test 1',
            ipv4: '197.55.135.243',
            devicesIds: [1],
        });
        const createdGateway = await gatewayService.create(gateway);

        expect(createdGateway).toBe(undefined);

    });

    it('should throw exception that gateway not exists when gateway not exists in update gateway devices', async () => {
        try {
            await gatewayService.updateGatewayDevices(2, [2]);
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe('this gateway does not exist');
            expect(e.status).toBe(HttpStatus.NOT_FOUND);
        }
    });

    it('should throw exception for devices ids when some devices not exists in the database in update gateway devices', async () => {
        try {
            await gatewayService.updateGatewayDevices(1, [2]);
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe('some of these devices invalid');
            expect(e.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it('should update devices successfully', async () => {
        const updatedGateway = await gatewayService.updateGatewayDevices(1, [1]);
        expect(updatedGateway).toBe(undefined);
    });
});
