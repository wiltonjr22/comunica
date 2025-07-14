import { UserService } from '@/contexts/user/application/service/users.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginDto } from '../../presentation/dtos/login.dto';
import { IUserService } from '@/contexts/user/application/interfaces/user.service.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
    private jwtService: JwtService
  ) { }

  async validateUser(login: string, password: string) {
    const user = await this.userService.findByLogin(login);
    if (user && await compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.login, loginDto.password);
    if (!user) throw new UnauthorizedException('credencias invalidas');
    const payload = { sub: user.id, login: user.login, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}