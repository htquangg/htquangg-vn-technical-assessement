import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CustomerUpdatedEvent } from '../../../domains';

@EventsHandler(CustomerUpdatedEvent)
export class CustomerUpdatedHandler
  implements IEventHandler<CustomerUpdatedEvent>
{
  private readonly logger: Logger = new Logger(CustomerUpdatedHandler.name);

  constructor() {}

  async handle(event: CustomerUpdatedEvent): Promise<void> {
    this.logger.log(`[${CustomerUpdatedEvent.name}]: ${JSON.stringify(event)}`);
  }
}
