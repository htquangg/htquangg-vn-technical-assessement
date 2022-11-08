import { ApiProperty } from '@nestjs/swagger';

export class DeleteCustomerParamDTO {
  @ApiProperty({
    format: 'id',
    example: '636a5a2ef7ef166ca714feee',
  })
  readonly id: string;
}
