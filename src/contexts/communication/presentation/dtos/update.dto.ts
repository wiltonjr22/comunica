import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { CanalTipo, StatusTipo } from '../../commom/entities/communication.entities';

export class UpdateCommunicationDto {
  @ApiPropertyOptional({
    description: 'Título do comunicado',
    example: 'Atualização do produto',
  })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiPropertyOptional({
    description: 'Conteúdo do comunicado',
    example: 'Detalhes atualizados sobre o lançamento...',
  })
  @IsOptional()
  @IsString()
  conteudo?: string;

  @ApiPropertyOptional({
    description: 'Tipo do canal do comunicado',
    enum: CanalTipo,
    example: CanalTipo.EMAIL,
  })
  @IsOptional()
  @IsEnum(CanalTipo)
  tipo_canal?: CanalTipo;

  @ApiPropertyOptional({
    description: 'Status do comunicado',
    enum: StatusTipo,
    example: StatusTipo,
  })
  @IsOptional()
  @IsEnum(StatusTipo)
  status?: StatusTipo;

  @ApiPropertyOptional({
    description: 'Nome do autor do comunicado',
    example: 'Maria Silva',
  })
  @IsOptional()
  @IsString()
  autor?: string;

  @ApiPropertyOptional({
    description: 'Flag para indicar se o comunicado está ativo',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
