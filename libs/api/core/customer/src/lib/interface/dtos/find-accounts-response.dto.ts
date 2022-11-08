import { ApiProperty } from '@nestjs/swagger';
import {
  FindCustomersResult,
  ItemInFindCustomersResult,
} from '../../applications/queries/handlers/find-customers.results';

class FindCustomerItem extends ItemInFindCustomersResult {
  @ApiProperty({ format: 'id' })
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
  readonly accounts: FindCustomersResult;
}
