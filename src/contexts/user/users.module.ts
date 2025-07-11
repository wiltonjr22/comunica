import { Module } from '@nestjs/common';
import { UserRepository } from './infra/repositories/user.repository';
import { UsersController } from './presentation/controllers/users.controller';
import { UserService } from './application/service/users.service';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule { }