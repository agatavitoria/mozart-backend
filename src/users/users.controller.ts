import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestDto, UnauthorizedRequestDto } from 'src/common/dtos';
import { CreateUserRequestDTO } from 'src/users/dtos';
import { UserResponseDTO } from 'src/users/dtos/user-response.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOkResponse({ type: UserResponseDTO })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @Post()
  async createUser(
    @Body() userData: CreateUserRequestDTO,
  ): Promise<UserResponseDTO> {
    try {
      const newUser = await this.service.create(userData);
      return UserResponseDTO.factory(newUser);
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }
}
