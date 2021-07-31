import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayRepository } from './repositories/gateway.repository';
import { GatewaySchema } from './schemas/gateway.schema';

@Module({
    controllers: [],
    providers: [GatewayRepository],
    imports: [
        InfrastructureModule,
        MongooseModule.forFeatureAsync([
            {
                name: 'gateway', useFactory: () => {
                    const schema = GatewaySchema;
                    schema.plugin(require('mongoose-auto-increment').plugin, { model: 'gateway', field: 'id', startAt: 1 });
                    return schema;
                  },
            },
        ]),
    ],
    exports: [GatewayRepository],
})
export class SharedModule {}
