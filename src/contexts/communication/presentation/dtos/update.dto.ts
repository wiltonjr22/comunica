import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsEnum } from "class-validator";
import { CanalTipo, StatusTipo } from "../../commom/entities/communication.entities";

export class UpdateCommunicationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  conteudo?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(CanalTipo)
  tipo_canal?: CanalTipo;

  @ApiProperty()
  @IsOptional()
  @IsEnum(StatusTipo)
  status?: StatusTipo;

  @ApiProperty()
  @IsOptional()
  @IsString()
  autor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  active?: boolean;
}