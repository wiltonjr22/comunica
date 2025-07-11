import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Request,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../auth/application/services/jwt-auth.guard";
import { UserService } from '../../application/service/users.service';
import { UpdatePasswordDto } from '../dtos/update.dto';
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  public async me(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('update/password')
  public async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    await this.usersService.updatePassword(updatePasswordDto, req.user.id);
    return {
      message: "password_update_success"
    };
  }
}