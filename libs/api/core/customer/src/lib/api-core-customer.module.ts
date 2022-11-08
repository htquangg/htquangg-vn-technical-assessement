import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenCustomerHandler } from './applications';
import { CustomerOpenedHandler } from './applications/events';
import { InjectionToken } from './applications/injection.token';
import { CustomerFactory } from './domains';
import {
  CustomerEntity,
  CustomerRepositoryImplement,
  CustomerSchema,
} from './infrastructures';

import { CustomerController } from './interface';

const infrastructures: Provider[] = [
  {
    provide: InjectionToken.CUSTOMER_REPOSITORY,
    useClass: CustomerRepositoryImplement,
  },
];

const applications = [OpenCustomerHandler, CustomerOpenedHandler];

const domains = [CustomerFactory];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: CustomerEntity.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [...infrastructures, ...applications, ...domains],
})
export class ApiCoreCustomerModule {}
