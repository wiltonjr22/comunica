import { Expose } from "class-transformer";
import { IsEnum, IsString, IsDate, IsUUID, IsOptional } from "class-validator";

export enum CanalTipo {
  EMAIL = "email",
  SLACK = "slack",
  TEAMS = "teams",
}

export enum StatusTipo {
  DRAFT = "rascunho",
  SENT = "enviado",
}

export class CommunicationFactoryEntity {
  @Expose({ name: "titulo" })
  @IsString()
  titulo: string;

  @Expose({ name: "conteudo" })
  @IsString()
  conteudo: string;

  @Expose({ name: "tipo_canal" })
  @IsEnum(CanalTipo)
  tipo_canal: CanalTipo;

  @Expose({ name: "status" })
  @IsEnum(StatusTipo)
  status: StatusTipo;

  @Expose({ name: "autor" })
  @IsString()
  autor: string;

  @Expose({ name: "data_criacao" })
  @IsDate()
  data_criacao: Date;

  @Expose({ name: "deletado_em" })
  @IsOptional()
  @IsDate()
  deletado_em?: Date;

  @Expose({ name: "data_envio" })
  @IsOptional()
  @IsDate()
  data_envio?: Date;
}

export class CommunicationEntity extends CommunicationFactoryEntity {
  @Expose({ name: "id" })
  @IsUUID()
  id: string;
}