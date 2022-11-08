import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { OpenCustomerCommand } from '../impl';
import { InjectionToken } from '../../injection.token';
import { CustomerRespository } from '../../../domains';
import { CustomerFactory } from '../../../domains/factory';

@CommandHandler(OpenCustomerCommand)
export class OpenCustomerHandler
  implements ICommandHandler<OpenCustomerCommand, void>
{
  constructor(
    @Inject(InjectionToken.CUSTOMER_REPOSITORY)
    private readonly customerRespository: CustomerRespository,
    private readonly customerFactory: CustomerFactory,
  ) {}

  async execute(command: OpenCustomerCommand): Promise<void> {
    const { name, email, password } = command.data;
    const customer = this.customerFactory.create({
      id: await this.customerRespository.newId(),
      name,
      email,
      password,
    });

    customer.open(password);

    await this.customerRespository.save(customer);

    customer.commit();
  }
}
