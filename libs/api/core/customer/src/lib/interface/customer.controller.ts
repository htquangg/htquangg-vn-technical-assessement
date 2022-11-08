import { Post, Controller, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OpenCustomerCommand } from '../applications/commands/impl';

import { OpenCustomerBodyDTO } from './dtos';
import { ResponseDescription } from './response-description';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async openCustomer(@Body() body: OpenCustomerBodyDTO): Promise<void> {
    const command = new OpenCustomerCommand(body);
    await this.commandBus.execute(command);
  }
}
