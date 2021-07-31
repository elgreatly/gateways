import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './services/gateway.service';
import { DeviceModule } from '../device/device.module';
import { SharedModule } from '../shared/shared.module';

@Module({
    controllers: [GatewayController],
    providers: [GatewayService],
    imports: [
        SharedModule,
        DeviceModule,
    ],
    exports: [GatewayService],
})
export class GatewayModule {}
