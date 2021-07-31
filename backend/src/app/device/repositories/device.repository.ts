import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DeviceModel } from '../models/device.model';
import { Device } from '../schemas/device.schema';

@Injectable()
export class DeviceRepository {

    constructor(@InjectModel('device') private device: Model<Device>) { }

    async find(limit: number, offset: number): Promise<DeviceModel[]> {
        const devices = await this.device.find().limit(limit).skip(offset);

        return devices.map(device => {
            return this.mapToModel(device);
        });
    }

    async count(): Promise<number> {
        return await this.device.find().countDocuments();
    }

    async findById(id: number): Promise<DeviceModel> {
        const device = await this.device.findOne({id});

        return device ? this.mapToModel(device) : null;
    }

    async findByIds(ids: number[]): Promise<DeviceModel[]> {
        const devices = await this.device.find({id: ids});

        return devices.map(device => {
            return this.mapToModel(device);
        });
    }

    async create(deviceModel: DeviceModel): Promise<void> {
        const deviceRecord = new this.device();
        deviceRecord.vendor = deviceModel.vendor;
        deviceRecord.status = deviceModel.status;

        await this.device.create(deviceRecord);
    }

    async delete(id: number): Promise<void> {
        const devices = await this.device.remove({id});
    }

    private mapToModel(device: Device): DeviceModel {
        return new DeviceModel({
            id: device.id,
            vendor: device.vendor,
            status: device.status,
            createdAt: device.createdAt,
        });
    }
}
