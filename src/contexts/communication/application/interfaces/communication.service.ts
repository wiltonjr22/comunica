import { CommunicationEntity } from "../../commom/entities/communication.entities";
import { CreateCommunicationDto } from "../../presentation/dtos/create.dto";
import { CommunicationFilterDto } from "../../presentation/dtos/get.dto";
import { UpdateCommunicationDto } from "../../presentation/dtos/update.dto";

export abstract class ICommunicationService {
  abstract create(createCommunicationDto: CreateCommunicationDto): Promise<void>;
  abstract findAll(filter: CommunicationFilterDto): Promise<{ data: CommunicationEntity[]; total: number }>
  abstract findOne(id: string): Promise<CommunicationEntity>;
  abstract update(id: string, updateDto: UpdateCommunicationDto): Promise<CommunicationEntity>;
  abstract remove(id: string): Promise<void>;
}