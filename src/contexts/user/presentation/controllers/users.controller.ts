import {
  Controller,
} from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { IUserService } from '../../application/interfaces/user.service.interface';
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: IUserService) { }
}