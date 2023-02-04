import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestDTO, UnauthorizedRequestDTO } from '~/common/dtos';
import { CreateUserRequesDTO, CreateUserResponseDTO } from './dtos';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiUnauthorizedResponse({ type: UnauthorizedRequestDTO })
@ApiBadRequestResponse({ type: BadRequestDTO })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: CreateUserResponseDTO })
  @Post()
  async create(@Body() params: CreateUserRequesDTO) {
    const { email, name, password, profileName } = params;

    try {
      const user = await this.usersService.create({
        email,
        name,
        password,
        profileName,
      });

      return CreateUserResponseDTO.factory(user);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
