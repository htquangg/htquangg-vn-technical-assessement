import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  Customer,
  CustomerImplement,
  CusomerEssentialProperties,
  CustomerProperties,
} from './customer';

@Injectable()
export class CustomerFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  create(data: CusomerEssentialProperties): Customer {
    return this.eventPublisher.mergeObjectContext(new CustomerImplement(data));
  }

  reconstitute(properties: CustomerProperties): Customer {
    return this.eventPublisher.mergeObjectContext(
      new CustomerImplement(properties),
    );
  }
}
