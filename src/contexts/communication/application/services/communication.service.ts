import { Injectable, NotFoundException } from "@nestjs/common";
import { ICommunicationService } from "../interfaces/communication.service";
import { CreateCommunicationDto } from "../../presentation/dtos/create.dto";
import { CommunicationEntity } from "../../commom/entities/communication.entities";
import { UpdateCommunicationDto } from "../../presentation/dtos/update.dto";
import { ICommunicationRepository } from "../../infra/interfaces/communication.repository";

@Injectable()
export class CommunicationService implements ICommunicationService {
  constructor(private readonly communicationRepository: ICommunicationRepository) {
  }

  async create(createCommunicationDto: CreateCommunicationDto): Promise<void> {
    await this.communicationRepository.create(createCommunicationDto);
  }

  async findAll(): Promise<CommunicationEntity[]> {
    return await this.communicationRepository.findAll();
  }

  async findOne(id: string): Promise<CommunicationEntity> {
    const record = await this.communicationRepository.findById(id);
    if (!record) throw new NotFoundException("communication not found");
    return record;
  }

  async update(id: string, updateDto: UpdateCommunicationDto): Promise<CommunicationEntity> {
    return await this.communicationRepository.update(id, updateDto);
  }

  async remove(id: string): Promise<void> {
    await this.communicationRepository.update(id, { active: false });
  }
}

