import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { UnexpectedError } from '../common/errors';
import { hasRequiredValues } from '../common/utils';
import { CreateUser } from './interfaces';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(params: CreateUser): Promise<UserModel> {
    const { email, name, password, profileName } = params;

    if (!hasRequiredValues([email, name, password])) {
      throw new UnexpectedError('Has no pass required params');
    }

    return this.repository.create({
      email,
      name,
      password,
      profileName,
    });
  }
}
