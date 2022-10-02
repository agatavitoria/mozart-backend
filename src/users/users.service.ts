import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UnexpectedError } from '../common/errors';
import { hasRequiredValues } from '../common/utils';
import { CreateUserParams, UpdateUserParams } from './interfaces';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(params: CreateUserParams): Promise<UserModel> {
    const { email, name, password, profileName } = params;

    if (!hasRequiredValues([email, name, password])) {
      throw new UnexpectedError('Has no pass required params');
    }

    return await this.repository.create({
      email,
      name,
      password,
      profileName,
    });
  }

  async findOne(userId: string): Promise<UserModel | null> {
    if (!hasRequiredValues([userId])) {
      throw new UnexpectedError('Has no userId');
    }

    return await this.repository.get({
      id: userId,
    });
  }

  async findAll() {
    return this.repository.getAll({});
  }

  async deleteUser(userId: string) {
    if (!hasRequiredValues([userId])) {
      throw new UnexpectedError('Has no userId');
    }

    return await this.repository.delete(userId);
  }

  async updateUser(params: UpdateUserParams) {
    const { userId, email, name, password, profileName } = params;

    if (!hasRequiredValues([userId])) {
      throw new UnexpectedError('Has no userId');
    }

    return await this.repository.update({
      where: { id: userId },
      data: { email, name, password, profileName },
    });
  }
}
