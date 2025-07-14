import { Module } from '@nestjs/common';
import { UserRepository } from './infra/repositories/user.repository';
import { UsersController } from './presentation/controllers/users.controller';
import { UserService } from './application/service/users.service';
import { IUserRepository } from './infra/interfaces/user.repository.interface';
import { IUserService } from './application/interfaces/user.service.interface';
import { DatabasesModule } from '@/resources/database/databases.modules';

@Module({
  controllers: [UsersController],
  imports: [DatabasesModule],
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },

  ],
  exports: [IUserService],
})
export class UserModule { }