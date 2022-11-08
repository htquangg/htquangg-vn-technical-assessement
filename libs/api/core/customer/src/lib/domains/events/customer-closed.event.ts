import { IEvent } from '@nestjs/cqrs';

import { CustomerProperties } from '../customer';

export class CustomerClosedEvent implements IEvent, CustomerProperties {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly balance: number;
  readonly openedAt: Date;
  readonly updatedAt: Date;
  readonly closedAt: Date | null;
}
