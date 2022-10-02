import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDTO {
  @ApiProperty({
    description: 'Email do usuário',
    type: String,
    example: 'example@email.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Nome do usuário',
    type: String,
    example: 'Agata Vitoria',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Senha de acesso do usuário',
    type: String,
    example: 'admin123',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Nome de perfil',
    type: String,
    example: 'agata_vitoria',
    name: 'profile_name',
    required: false,
  })
  @Expose({ name: 'profile_name' })
  @IsString()
  @IsOptional()
  profileName?: string;
}
