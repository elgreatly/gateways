import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DeviceStatusEnum } from '../enums/device-status.enum';

@Schema({ timestamps: true })
export class Device extends Document {
    @Prop()
    vendor: string;

    @Prop()
    status: DeviceStatusEnum;

    @Prop()
    createdAt: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
