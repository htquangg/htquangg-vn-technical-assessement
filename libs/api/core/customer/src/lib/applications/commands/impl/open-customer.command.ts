import { ICommand } from '@nestjs/cqrs';

export class OpenCustomerCommand implements ICommand {
  constructor(
    readonly data: { name: string; email: string; password: string },
  ) {}
}
