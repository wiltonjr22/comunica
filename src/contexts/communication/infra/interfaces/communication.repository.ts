import { CommunicationEntity } from "../../commom/entities/communication.entities";
import { CreateCommunicationDto } from "../../presentation/dtos/create.dto";
import { UpdateCommunicationDto } from "../../presentation/dtos/update.dto";

export abstract class ICommunicationRepository {
  abstract create(data: CreateCommunicationDto): Promise<void>;
  abstract findAll(): Promise<CommunicationEntity[]>;
  abstract findById(id: string): Promise<CommunicationEntity | null>;
  abstract update(id: string, data: UpdateCommunicationDto): Promise<CommunicationEntity>;
}