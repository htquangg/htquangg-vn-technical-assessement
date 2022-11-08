import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CloseCustomerCommand } from '../impl';
import { InjectionToken } from '../../injection.token';
import { CustomerRespository, ErrorMessage } from '../../../domains';

@CommandHandler(CloseCustomerCommand)
export class CloseCustomerHandler
  implements ICommandHandler<CloseCustomerCommand, void>
{
  constructor(
    @Inject(InjectionToken.CUSTOMER_REPOSITORY)
    private readonly customerRespository: CustomerRespository,
  ) {}

  async execute(command: CloseCustomerCommand): Promise<void> {
    const customer = await this.customerRespository.findById(command.id);
    if (!customer)
      throw new NotFoundException(ErrorMessage.CUSTOMER_IS_NOT_FOUND);

    customer.close();

    await this.customerRespository.save(customer);

    customer.commit();
  }
}
