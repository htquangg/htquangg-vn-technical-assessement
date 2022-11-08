import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerBodyDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Quang' })
  readonly name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'htquang@gmail.com' })
  readonly email: string;
}
