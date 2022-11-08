import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateCustomerCommand } from '../impl';
import { InjectionToken } from '../../injection.token';
import { CustomerRespository, ErrorMessage } from '../../../domains';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand, void>
{
  constructor(
    @Inject(InjectionToken.CUSTOMER_REPOSITORY)
    private readonly customerRespository: CustomerRespository,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<void> {
    const { id, name, email } = command.data;
    const customer = await this.customerRespository.findById(id);
    if (!customer)
      throw new NotFoundException(ErrorMessage.CUSTOMER_IS_NOT_FOUND);

    customer.update({ name, email });

    await this.customerRespository.save(customer);

    customer.commit();
  }
}
