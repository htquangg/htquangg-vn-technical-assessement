import { ApiProperty } from '@nestjs/swagger';

export class FindCustomerByIdParamDTO {
  @ApiProperty({
    format: 'id',
    example: '636a70c5c3f90e250beb35b8',
  })
  readonly id: string;
}
