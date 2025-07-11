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

export abstract class CommunicationFactoryEntity {
  titulo: string;
  conteudo: string;
  tipo_canal: CanalTipo;
  status: StatusTipo;
  autor: string;
  data_criacao: Date;
  deletado_em?: Date;
  data_envio?: Date;
}

export class CommunicationEntity extends CommunicationFactoryEntity {
  id: string;
}