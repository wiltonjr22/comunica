import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CanalTipo, StatusTipo } from "../../commom/entities/communication.entities";

export class CreateCommunicationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @ApiProperty()
  @IsEnum(CanalTipo)
  @IsNotEmpty()
  tipo_canal: CanalTipo;

  @ApiProperty({ enum: StatusTipo, default: StatusTipo.DRAFT })
  @IsEnum(StatusTipo)
  status: StatusTipo;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  autor: string;
}
