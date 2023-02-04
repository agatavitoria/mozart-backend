import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { CreateUserParams } from './interfaces';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(params: CreateUserParams): Promise<UserModel> {
    const { email, name, password, profileName } = params;

    return await this.userRepository.create({
      email,
      name,
      password,
      profileName,
    });
  }
}
