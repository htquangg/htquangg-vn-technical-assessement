import { ApiProperty } from '@nestjs/swagger';

import { FindCustomerByIdResult } from '../../applications';

export class FindCustomerByIdResponseDTO extends FindCustomerByIdResult {
  @ApiProperty({ format: 'uuid' })
  readonly id: string;

  @ApiProperty({ example: 'Quang' })
  readonly name: string;

  @ApiProperty({ example: 100 })
  readonly balance: number;

  @ApiProperty()
  readonly openedAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty({ nullable: true, required: false, example: null })
  readonly closedAt: Date | null;
}
