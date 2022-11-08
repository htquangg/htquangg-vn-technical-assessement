import { IQuery } from '@nestjs/cqrs';

export class FindCustomersQuery implements IQuery {
  constructor(readonly offset: number, readonly limit: number) {}
}
