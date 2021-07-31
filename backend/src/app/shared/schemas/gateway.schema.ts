import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Gateway extends Document {
    @Prop()
    serialNumber: string;

    @Prop()
    name: string;

    @Prop()
    IPv4: string;

    @Prop()
    devices: number[];
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
