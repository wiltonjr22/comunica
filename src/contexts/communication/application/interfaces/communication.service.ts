import { CommunicationEntity } from "../../commom/entities/communication.entities";
import { CreateCommunicationDto } from "../../presentation/dtos/create.dto";
import { CommunicationFilterDto } from "../../presentation/dtos/get.dto";
import { UpdateCommunicationDto } from "../../presentation/dtos/update.dto";

export interface ICommunicationService {
  create(createCommunicationDto: CreateCommunicationDto): Promise<void>;
  findAll(filter: CommunicationFilterDto): Promise<{ data: CommunicationEntity[]; total: number }>
  findOne(id: string): Promise<CommunicationEntity>;
  update(id: string, updateDto: UpdateCommunicationDto): Promise<CommunicationEntity>;
  remove(id: string): Promise<void>;
}