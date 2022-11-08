import { ICommand } from '@nestjs/cqrs';

export class UpdateCustomerCommand implements ICommand {
  constructor(readonly data: { id: string; name?: string; email?: string }) {}
}
