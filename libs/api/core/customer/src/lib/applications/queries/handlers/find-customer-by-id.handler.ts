import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CustomerQuery } from '../customer.query';
import { ErrorMessage } from '../../../domains';
import { InjectionToken } from '../../injection.token';
import { FindCustomerByIdQuery } from '../impl';
import { FindCustomerByIdResult } from '../results/find-customer-by-id.result';

@QueryHandler(FindCustomerByIdQuery)
export class FindCustomerByIdHandler
  implements IQueryHandler<FindCustomerByIdQuery, FindCustomerByIdResult>
{
  constructor(
    @Inject(InjectionToken.CUSTOMER_QUERY)
    readonly customerQuery: CustomerQuery,
  ) {}

  async execute(query: FindCustomerByIdQuery): Promise<FindCustomerByIdResult> {
    const data = await this.customerQuery.findById(query.id);
    if (!data) throw new NotFoundException(ErrorMessage.CUSTOMER_IS_NOT_FOUND);

    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new FindCustomerByIdResult());

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
