import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class OpenCustomerBodyDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(8)
  @ApiProperty({ minLength: 2, maxLength: 8, example: 'Quang' })
  readonly name: string;

  @IsEmail()
  @ApiProperty({ minLength: 2, maxLength: 8, example: 'htquangg@gmail.com' })
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({ minLength: 8, maxLength: 32, example: 'password' })
  readonly password: string;
}
