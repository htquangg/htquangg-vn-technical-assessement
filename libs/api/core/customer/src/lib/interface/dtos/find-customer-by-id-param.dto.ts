import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindCustomerByIdParamDTO {
  @IsString()
  @ApiProperty({
    format: 'uuid',
    example: '636a70c5c3f90e250beb35b8',
  })
  readonly id: string;
}
