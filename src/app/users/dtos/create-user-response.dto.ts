import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { snakeKeys } from '~/common/utils';

export class CreateUserResponseDTO {
  @ApiProperty({
    type: Object,
    example: {
      id: '524756c3-a956-4cb5-828d-71f3409e5f3d',
      email: 'example+2@email.com',
      name: 'Tony Stark',
      password: '##123',
      profileName: null,
    },
  })
  data: Record<string, string>;

  static factory(user: UserModel) {
    const { createdAt, deletedAt, ...newUser } = user;
    const userInSnake = snakeKeys(newUser);

    return {
      data: userInSnake,
    };
  }
}
