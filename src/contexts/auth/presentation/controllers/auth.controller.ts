import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto, LoginResponseDto } from '../dtos/login.dto';
import { Public } from '@/contexts/auth/presentation/controllers/public.jwt';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Realiza login e retorna um token JWT' })
  @ApiResponse({
    status: 201,
    description: 'Login realizado com sucesso',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
}
