import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CustomerOpenedEvent as CustomerOpenedEvent } from '../../../domains';

@EventsHandler(CustomerOpenedEvent)
export class CustomerOpenedHandler
  implements IEventHandler<CustomerOpenedEvent>
{
  private readonly logger: Logger = new Logger(CustomerOpenedHandler.name);

  constructor() {}

  async handle(event: CustomerOpenedEvent): Promise<void> {
    this.logger.log(`[CustomerOpenedEvent]: ${JSON.stringify(event)}`);
  }
}
