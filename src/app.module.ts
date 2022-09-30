import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  providers: [UsersService],
})
export class AppModule {}
