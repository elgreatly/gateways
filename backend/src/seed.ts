import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Seeder } from './app/seeder/seeder';
import { SeederModule } from './app/seeder/seeder.module';

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
      .then(async appContext =>  {
        const logger = appContext.get(Logger);
        const seeder = appContext.get(Seeder);
        try {
            await seeder.seed();
        } catch (e) {
            logger.error('Seeding failed!');
        }
        logger.debug('Seeding complete!');
        appContext.close();
      })
      .catch(error => {
        throw error;
      });
}
bootstrap();
