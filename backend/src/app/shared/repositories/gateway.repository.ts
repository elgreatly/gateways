import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Gateway } from '../schemas/gateway.schema';
import { GatewayModel } from '../../gateway/models/gateway.model';

@Injectable()
export class GatewayRepository {

    constructor(@InjectModel('gateway') private gateway: Model<Gateway>) { }

    async find(limit: number, offset: number): Promise<GatewayModel[]> {
        const gateways = await this.gateway.find().limit(limit).skip(offset);

        return gateways.map(gateway => {
            return this.mapToModel(gateway);
        });
    }

    async count(): Promise<number> {
        return await this.gateway.find().countDocuments();
    }

    async findBySerialNumber(serialNumber: string): Promise<GatewayModel> {
        const gateway = await this.gateway.findOne({serialNumber});

        return gateway ? this.mapToModel(gateway) : null;
    }

    async findById(id: number): Promise<GatewayModel> {
        const gateway = await this.gateway.findOne({id});

        return gateway ? this.mapToModel(gateway) : null;
    }

    async findByDeviceId(deviceId: number, limit: number, offset: number): Promise<GatewayModel[]> {
        const gateways = await this.gateway.find({devices: deviceId}).limit(limit).skip(offset);

        return gateways.map(gateway => {
            return this.mapToModel(gateway);
        });
    }

    async create(gatewayModel: GatewayModel): Promise<void> {
        const gatewayRecord = new this.gateway();
        gatewayRecord.serialNumber = gatewayModel.serialNumber;
        gatewayRecord.name = gatewayModel.name;
        gatewayRecord.IPv4 = gatewayModel.ipv4;
        gatewayRecord.devices = gatewayModel.devicesIds;

        await this.gateway.create(gatewayRecord);
    }

    async addDevices(id: number, devicesIds: number[]): Promise<void> {
        await this.gateway.updateOne({id}, {devices: devicesIds});
    }

    private mapToModel(gateway: Gateway): GatewayModel {
        return new GatewayModel({
            id: gateway.id,
            serialNumber: gateway.serialNumber,
            name: gateway.name,
            ipv4: gateway.IPv4,
            devicesIds: gateway.devices,
        });
    }
}
