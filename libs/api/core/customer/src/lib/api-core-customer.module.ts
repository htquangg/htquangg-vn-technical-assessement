import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CloseCustomerHandler,
  FindCustomerByIdHandler,
  FindCustomersHandler,
  OpenCustomerHandler,
} from './applications';
import { UpdateCustomerHandler } from './applications/commands/handlers/update-customer.handler';
import { CustomerOpenedHandler } from './applications/events';
import { CustomerClosedHandler } from './applications/events/handlers/customer-closed.handler';
import { InjectionToken } from './applications/injection.token';
import { CustomerFactory, CustomerUpdatedEvent } from './domains';
import {
  CustomerEntity,
  CustomerRepositoryImplement,
  CustomerSchema,
  CustomerQueryImplement,
} from './infrastructures';

import { CustomerController } from './interface';

const infrastructures: Provider[] = [
  {
    provide: InjectionToken.CUSTOMER_REPOSITORY,
    useClass: CustomerRepositoryImplement,
  },
  {
    provide: InjectionToken.CUSTOMER_QUERY,
    useClass: CustomerQueryImplement,
  },
];

const applications = [
  OpenCustomerHandler,
  CustomerOpenedHandler,
  CloseCustomerHandler,
  CustomerClosedHandler,
  FindCustomersHandler,
  FindCustomerByIdHandler,
  UpdateCustomerHandler,
  CustomerUpdatedEvent,
];

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
