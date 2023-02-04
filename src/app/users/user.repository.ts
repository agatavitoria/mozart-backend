import { Injectable } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { PrismaService } from '~/common/services';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(params: Prisma.UserCreateInput): Promise<UserModel> {
    const { email, name, password, profileName } = params;

    return await this.prismaService.user.create({
      data: {
        email,
        name,
        password,
        profileName,
      },
    });
  }
}
