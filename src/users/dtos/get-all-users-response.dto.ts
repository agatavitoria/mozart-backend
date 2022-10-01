import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { removeAllUndefinedAttrs, snakeKeys } from '../../common/utils';

export class GetAllUsersResponseDTO {
  @ApiProperty({
    type: Object,
    example: {
      user: [
        {
          id: 'bb40641c-96de-40e9-a7b8-52ab22e7bfb9',
          email: 'example@email.com',
          name: 'Agata Vitoria',
          profile_name: 'agata_vitoria',
        },
      ],
    },
    required: true,
  })
  data: any;

  static factory(users: UserModel[]) {
    const newData = users.map((user) => {
      const userData = {
        ...user,
        createdAt: undefined,
        deletedAt: undefined,
        password: undefined,
      };

      const userWithoutUndefindValues = removeAllUndefinedAttrs(userData);
      const newUser = snakeKeys(userWithoutUndefindValues);

      return newUser;
    });

    return {
      data: {
        users: newData,
      },
    };
  }
}
