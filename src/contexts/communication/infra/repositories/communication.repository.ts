import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/resources/database/prisma/prisma.service";
import { ICommunicationRepository } from "../interfaces/communication.repository";
import { CreateCommunicationDto } from "../../presentation/dtos/create.dto";
import { CommunicationEntity, StatusTipo } from "../../commom/entities/communication.entities";
import { UpdateCommunicationDto } from "../../presentation/dtos/update.dto";

@Injectable()
export class CommunicationRepository implements ICommunicationRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateCommunicationDto): Promise<void> {
    await this.prisma.communications.create({
      data: {
        titulo: data.titulo,
        conteudo: data.conteudo,
        tipo_canal: data.tipo_canal,
        status: data.status,
        autor: data.autor,
      },
    });
  }

  async findAll(): Promise<CommunicationEntity[]> {
    const communications = await this.prisma.communications.findMany();
    return communications.map(this.toEntity);
  }

  async findById(id: string): Promise<CommunicationEntity | null> {
    const communication = await this.prisma.communications.findUnique({ where: { id } });
    return this.toEntity(communication);
  }

  async update(id: string, data: UpdateCommunicationDto): Promise<CommunicationEntity> {
    const communication = await this.prisma.communications.update({ where: { id }, data });
    return this.toEntity(communication);
  }


  private toEntity(communication: any): CommunicationEntity {
    if (!communication) return null;
    return {
      ...communication,
      status: communication.status as StatusTipo,
      data_criacao: new Date(communication.data_criacao),
      data_envio: communication.data_envio ? new Date(communication.data_envio) : null
    };
  }
}