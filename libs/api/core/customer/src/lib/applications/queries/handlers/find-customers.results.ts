import { IQueryResult } from '@nestjs/cqrs';

export class ItemInFindCustomersResult {
  readonly id: string = '';
  readonly name: string = '';
  readonly email: string = '';
  readonly balance: number = 0;
}

export class FindCustomersResult
  extends Array<ItemInFindCustomersResult>
  implements IQueryResult {}
