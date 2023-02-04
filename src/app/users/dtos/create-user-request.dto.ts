import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserRequesDTO {
  @ApiProperty({
    type: String,
    description: 'Email do usuário',
    name: 'email',
    example: 'example@gmail.com',
    required: true,
    minimum: 10,
  })
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Nome do usuário',
    name: 'name',
    example: 'Tony Stark',
    required: true,
    minimum: 3,
  })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Senha de acesso do usuário',
    name: 'password',
    example: '##7654',
    required: true,
    minimum: 8,
  })
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Senha de acesso do usuário',
    name: 'profile_name',
    example: 'example_10',
    required: true,
    minimum: 1,
  })
  @MinLength(1)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'profile_name' })
  profileName?: string;
}
