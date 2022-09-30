import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import { UserRepository } from 'src/users/user.repository';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserRepository],
})
export class UsersModule {}
