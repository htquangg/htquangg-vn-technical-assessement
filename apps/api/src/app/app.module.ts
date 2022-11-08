import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiCoreModule } from './api-core.module';

import config from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleOptions> => {
        return {
          uri: configService.get('MONGO_URI'),
          dbName: configService.get('MONGO_DATABASE'),
        };
      },
      inject: [ConfigService],
    }),
    ApiCoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
