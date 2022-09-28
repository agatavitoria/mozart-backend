import { Injectable } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { PrismaService } from '../common/services';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
}
