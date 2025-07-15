import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'usuario@email.com', description: 'Login do usuário. Pode ser e-mail ou username.' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Senha do usuário.' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
