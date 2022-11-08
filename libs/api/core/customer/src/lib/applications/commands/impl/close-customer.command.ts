import { ICommand } from '@nestjs/cqrs';

export class CloseCustomerCommand implements ICommand {
  constructor(readonly id: string) {}
}
