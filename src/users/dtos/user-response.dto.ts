import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { removeAllUndefinedAttrs, snakeKeys } from '../../common/utils';

export class UserResponseDTO {
  @ApiProperty({
    type: Object,
    example: {
      user: {
        id: '43a20a14-a60b-4d40-991f-40baf2d76b45',
        email: 'example+2@email.com',
        name: 'Agata Vitoria',
        profile_name: 'agata_vitoria',
      },
    },
    required: true,
  })
  data: any;

  static factory(data: UserModel) {
    const userData = {
      ...data,
      createdAt: undefined,
      deletedAt: undefined,
      password: undefined,
    };

    const userWithoutUndefindValues = removeAllUndefinedAttrs(userData);
    const newUser = snakeKeys(userWithoutUndefindValues);

    return {
      data: {
        user: newUser,
      },
    };
  }
}
