import {
  Get,
  Post,
  Controller,
  Body,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindCustomersQuery } from '../applications';
import {
  CloseCustomerCommand,
  OpenCustomerCommand,
} from '../applications/commands/impl';

import {
  CreateCustomerBodyDTO,
  DeleteCustomerParamDTO,
  FindCustomersQueryDTO,
  FindCustomersResponseDTO,
} from './dtos';
import { ResponseDescription } from './response-description';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async openCustomer(@Body() body: CreateCustomerBodyDTO): Promise<void> {
    const command = new OpenCustomerCommand(body);
    await this.commandBus.execute(command);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: ResponseDescription.OK,
    type: FindCustomersResponseDTO,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findCustomers(
    @Query() queryDto: FindCustomersQueryDTO,
  ): Promise<FindCustomersResponseDTO> {
    const query = new FindCustomersQuery(queryDto.offset, queryDto.limit);
    return { accounts: await this.queryBus.execute(query) };
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
