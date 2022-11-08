import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiCoreModule } from './api-core.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://root:root@127.0.0.1:27017',
        dbName: 'test',
      }),
    }),
    // MongooseModule.forRoot('mongodb://root:root@127.0.0.1:27017'),
    ApiCoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
