import { IQueryResult } from '@nestjs/cqrs';

export class FindCustomerByIdResult implements IQueryResult {
  readonly id: string = '';
  readonly name: string = '';
  readonly email: string = '';
  readonly balance: number = 0;
  readonly openedAt: Date = new Date();
  readonly updatedAt: Date = new Date();
  readonly closedAt: Date | null = null;
}
