import { Post, Controller, Body, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CloseCustomerCommand,
  OpenCustomerCommand,
} from '../applications/commands/impl';

import { CreateCustomerBodyDTO } from './dtos';
import { DeleteCustomerParamDTO } from './dtos/delete-customer-param.dto';
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
  async openCustomer(@Body() body: CreateCustomerBodyDTO): Promise<void> {
    const command = new OpenCustomerCommand(body);
    await this.commandBus.execute(command);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async closeCustomer(@Param() param: DeleteCustomerParamDTO) {
    const command = new CloseCustomerCommand(param.id);
    await this.commandBus.execute(command);
  }
}
