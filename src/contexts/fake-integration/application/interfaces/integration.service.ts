import { GetTransactionDto } from "../../presentation/dtos/integration.dto";

export abstract class IIntegrationService {
  abstract getTransaction(): Promise<GetTransactionDto>;
}