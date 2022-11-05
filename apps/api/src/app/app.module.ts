import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiCoreCustomerModule } from '@htquangg/api/core/customer';

@Module({
  imports: [ApiCoreCustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
