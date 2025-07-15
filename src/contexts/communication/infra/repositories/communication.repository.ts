import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@/resources/database/prisma/prisma.service";
import { ICommunicationRepository } from "../interfaces/communication.repository";
import { CreateCommunicationDto } from "../../presentation/dtos/create.dto";
import { CommunicationEntity, StatusTipo } from "../../commom/entities/communication.entities";
import { UpdateCommunicationDto } from "../../presentation/dtos/update.dto";
import { CommunicationFilterDto } from "../../presentation/dtos/get.dto";

@Injectable()
export class CommunicationRepository implements ICommunicationRepository {
  private readonly logger = new Logger(CommunicationRepository.name);

  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateCommunicationDto): Promise<void> {
    this.logger.log(`Criando comunicado: ${data.titulo}`);
    await this.prisma.communications.create({
      data: {
        titulo: data.titulo,
        conteudo: data.conteudo,
        tipo_canal: data.tipo_canal,
        status: data.status,
        autor: data.autor,
      },
    });
    this.logger.log('Comunicado criado no banco de dados.');
  }

  async findAll(filter: CommunicationFilterDto): Promise<{ data: CommunicationEntity[]; total: number }> {
    this.logger.log('Buscando comunicados com filtros...');

    const {
      status,
      tipo_canal,
      autor,
      data_criacao_inicio,
      data_criacao_fim,
      data_envio_inicio,
      data_envio_fim,
      limit = 10,
      offset = 0,
    } = filter;

    const where: any = {};

    if (status) where.status = status;
    if (tipo_canal) where.tipo_canal = tipo_canal;
    if (autor) where.autor = autor;

    if (data_criacao_inicio || data_criacao_fim) {
      where.data_criacao = {};
      if (data_criacao_inicio) where.data_criacao.gte = new Date(data_criacao_inicio);
      if (data_criacao_fim) where.data_criacao.lte = new Date(data_criacao_fim);
    }

    if (data_envio_inicio || data_envio_fim) {
      where.data_envio = {};
      if (data_envio_inicio) where.data_envio.gte = new Date(data_envio_inicio);
      if (data_envio_fim) where.data_envio.lte = new Date(data_envio_fim);
    }

    const [dataRaw, total] = await Promise.all([
      this.prisma.communications.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { data_criacao: 'desc' },
      }),
      this.prisma.communications.count({ where }),
    ]);

    this.logger.log(`${total} comunicado(s) encontrado(s).`);

    const data = dataRaw.map(item => this.toEntity(item));
    return { data, total };
  }

  async findById(id: string): Promise<CommunicationEntity | null> {
    this.logger.log(`Buscando comunicado por ID: ${id}`);
    const communication = await this.prisma.communications.findUnique({ where: { id } });

    if (!communication) {
      this.logger.warn(`Comunicado com ID ${id} não encontrado no banco.`);
      return null;
    }

    this.logger.log(`Comunicado encontrado: ${communication.titulo}`);
    return this.toEntity(communication);
  }

  async update(id: string, data: UpdateCommunicationDto): Promise<CommunicationEntity> {
    this.logger.log(`Atualizando comunicado com ID: ${id}`);
    const communication = await this.prisma.communications.update({ where: { id }, data });
    this.logger.log(`Comunicado com ID ${id} atualizado com sucesso.`);
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
