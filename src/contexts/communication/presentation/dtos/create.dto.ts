import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CanalTipo, StatusTipo } from '../../commom/entities/communication.entities';

export class CreateCommunicationDto {
  @ApiProperty({
    example: 'Lançamento do novo produto',
    description: 'Título do comunicado',
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    example: 'Estamos felizes em anunciar o novo produto...',
    description: 'Conteúdo completo do comunicado',
  })
  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @ApiProperty({
    enum: CanalTipo,
    description: 'Tipo de canal utilizado para o comunicado',
    example: CanalTipo.EMAIL,
  })
  @IsEnum(CanalTipo)
  @IsNotEmpty()
  tipo_canal: CanalTipo;

  @ApiProperty({
    enum: StatusTipo,
    default: StatusTipo.DRAFT,
    description: 'Status inicial do comunicado',
    example: StatusTipo.DRAFT,
  })
  @IsEnum(StatusTipo)
  status: StatusTipo;

  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome do autor do comunicado',
  })
  @IsString()
  @IsNotEmpty()
  autor: string;
}
