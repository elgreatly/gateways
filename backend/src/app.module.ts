import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GatewayModule } from './app/gateway/gateway.module';
import { HttpExceptionFilter } from './infrastructure/exception-filter/exception-filter';
import { DeviceModule } from './app/device/device.module';
import { BadRequestExceptionFilter } from './infrastructure/exception-filter/bad-request-exception-filter';

@Module({
    imports: [
        InfrastructureModule,
        ScheduleModule.forRoot(),
        GatewayModule,
        DeviceModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: BadRequestExceptionFilter,
        },
    ],
})
export class AppModule {}
