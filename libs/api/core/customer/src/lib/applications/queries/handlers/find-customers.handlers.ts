import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { InjectionToken } from '../../injection.token';
import { CustomerQuery, ItemInCustomers } from '../customer.query';
import { FindCustomersQuery } from '../impl';
import {
  FindCustomersResult,
  ItemInFindCustomersResult,
} from './find-customers.results';

@QueryHandler(FindCustomersQuery)
export class FindAccountsHandler
  implements IQueryHandler<FindCustomersQuery, FindCustomersResult>
{
  constructor(
    @Inject(InjectionToken.ACCOUNT_QUERY) readonly accountQuery: CustomerQuery,
  ) {}

  async execute(query: FindCustomersQuery): Promise<FindCustomersResult> {
    return (await this.accountQuery.find(query.offset, query.limit)).map(
      this.filterResultProperties,
    );
  }

  private filterResultProperties(
    data: ItemInCustomers,
  ): ItemInFindCustomersResult {
    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new ItemInFindCustomersResult());

    if (dataKeys.length < resultKeys.length)
      throw new InternalServerErrorException();

    if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey)))
      throw new InternalServerErrorException();

    dataKeys
      .filter((dataKey) => !resultKeys.includes(dataKey))
      .forEach((dataKey) => delete data[dataKey]);

    return data;
  }
}
