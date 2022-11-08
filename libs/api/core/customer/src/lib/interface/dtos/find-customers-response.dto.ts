import { ApiProperty } from '@nestjs/swagger';
import {
  FindCustomersResult,
  ItemInFindCustomersResult,
} from '../../applications/queries';

class FindCustomerItem extends ItemInFindCustomersResult {
  @ApiProperty({ format: 'uuid' })
  readonly id: string;

  @ApiProperty({ example: 'Quang' })
  readonly name: string;

  @ApiProperty({ example: 'htquangg@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: 100 })
  readonly balance: number;
}

export class FindCustomersResponseDTO {
  @ApiProperty({ type: [FindCustomerItem] })
  readonly customers: FindCustomersResult;
}
