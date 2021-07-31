import { Logger } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { DeviceModule } from '../device/device.module';
import { GatewayModule } from '../gateway/gateway.module';
import { Seeder } from './seeder';

@Module({
    controllers: [],
    providers: [Logger, Seeder],
    imports: [
        GatewayModule,
        DeviceModule,
    ],
})
export class SeederModule {}
