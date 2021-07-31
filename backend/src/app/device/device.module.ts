import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from './schemas/device.schema';
import { DeviceService } from './services/device.service';
import { DeviceRepository } from './repositories/device.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
    controllers: [DeviceController],
    providers: [DeviceService, DeviceRepository],
    imports: [
        SharedModule,
        MongooseModule.forFeatureAsync([
            {
                name: 'device', useFactory: () => {
                    const schema = DeviceSchema;
                    schema.plugin(require('mongoose-auto-increment').plugin, { model: 'device', field: 'id', startAt: 1 });
                    return schema;
                  },
            },
        ]),
    ],
    exports: [DeviceService],
})
export class DeviceModule {}
