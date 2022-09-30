import { Injectable } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { PrismaService } from '../common/services';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  get(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  create(data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.prismaService.user.create({
      data,
    });
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserModel> {
    const { where, data } = params;
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  delete(id: string): Prisma.Prisma__UserClient<UserModel> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
