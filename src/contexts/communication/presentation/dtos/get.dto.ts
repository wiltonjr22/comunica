import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsDateString } from 'class-validator';

export class CommunicationFilterDto {
  @ApiPropertyOptional({ description: 'Filtrar por status do comunicado', example: 'SENT' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Filtrar por tipo de canal', example: 'EMAIL' })
  @IsOptional()
  @IsString()
  tipo_canal?: string;

  @ApiPropertyOptional({ description: 'Filtrar por autor', example: 'João da Silva' })
  @IsOptional()
  @IsString()
  autor?: string;

  @ApiPropertyOptional({ description: 'Data de criação inicial (ISO 8601)', example: '2025-07-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  data_criacao_inicio?: string;

  @ApiPropertyOptional({ description: 'Data de criação final (ISO 8601)', example: '2025-07-31T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  data_criacao_fim?: string;

  @ApiPropertyOptional({ description: 'Data de envio inicial (ISO 8601)', example: '2025-07-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  data_envio_inicio?: string;

  @ApiPropertyOptional({ description: 'Data de envio final (ISO 8601)', example: '2025-07-31T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  data_envio_fim?: string;

  @ApiPropertyOptional({ description: 'Número máximo de itens por página', minimum: 1, example: 10, default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Número de itens para pular (offset da paginação)', minimum: 0, example: 0, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
