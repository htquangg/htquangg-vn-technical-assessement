import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CustomerClosedEvent } from '../../../domains';

@EventsHandler(CustomerClosedEvent)
export class CustomerClosedHandler
  implements IEventHandler<CustomerClosedEvent>
{
  private readonly logger: Logger = new Logger(CustomerClosedHandler.name);

  constructor() {}

  async handle(event: CustomerClosedEvent): Promise<void> {
    this.logger.log(`[${CustomerClosedEvent.name}]: ${JSON.stringify(event)}`);
  }
}
