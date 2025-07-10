import { CommunicationEntity } from "../../commom/entities/communication.entities";
import { CreateCommunicationDto } from "../../presentation/dtos/create.dto";
import { UpdateCommunicationDto } from "../../presentation/dtos/update.dto";

export interface ICommunicationService {
  create(createCommunicationDto: CreateCommunicationDto): Promise<void>;
  findAll(): Promise<CommunicationEntity[]>;
  findOne(id: string): Promise<CommunicationEntity>;
  update(id: string, updateDto: UpdateCommunicationDto): Promise<CommunicationEntity>;
  remove(id: string): Promise<void>;
}