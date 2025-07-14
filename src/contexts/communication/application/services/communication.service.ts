import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ICommunicationService } from "../interfaces/communication.service";
import { CreateCommunicationDto } from "../../presentation/dtos/create.dto";
import { CommunicationEntity } from "../../commom/entities/communication.entities";
import { UpdateCommunicationDto } from "../../presentation/dtos/update.dto";
import { ICommunicationRepository } from "../../infra/interfaces/communication.repository";
import { CommunicationFilterDto } from "../../presentation/dtos/get.dto";

@Injectable()
export class CommunicationService implements ICommunicationService {
  private readonly logger = new Logger(CommunicationService.name);

  constructor(
    private readonly communicationRepository: ICommunicationRepository,
  ) { }

  async create(createCommunicationDto: CreateCommunicationDto): Promise<void> {
    this.logger.log('Criando um novo comunicado');
    await this.communicationRepository.create(createCommunicationDto);
    this.logger.log('Comunicado criado com sucesso.');
  }

  async findAll(filter: CommunicationFilterDto): Promise<{ data: CommunicationEntity[]; total: number }> {
    this.logger.log('Buscando todos os comunicados com filtro');
    const result = await this.communicationRepository.findAll(filter);
    this.logger.log(`${result.total} comunicado(s) encontrado(s).`);
    return result;
  }

  async findOne(id: string): Promise<CommunicationEntity> {
    this.logger.log(`Buscando comunicado com ID: ${id}`);
    const record = await this.communicationRepository.findById(id);
    if (!record) {
      this.logger.warn(`Comunicado com ID ${id} não encontrado.`);
      throw new NotFoundException("Comunicado não encontrado");
    }
    this.logger.log(`Comunicado encontrado`);
    return record;
  }

  async update(id: string, updateDto: UpdateCommunicationDto): Promise<CommunicationEntity> {
    this.logger.log(`Atualizando comunicado com ID: ${id}`);
    const updated = await this.communicationRepository.update(id, updateDto);
    this.logger.log(`Comunicado atualizado com sucesso.`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Inativando comunicado com ID: ${id}`);
    await this.communicationRepository.update(id, { active: false });
    this.logger.log(`Comunicado inativado com sucesso.`);
  }
}
