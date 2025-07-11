import { GetTransactionDto } from "../../presentation/dtos/integration.dto";

export interface IIntegrationService {
  getTransaction(): Promise<GetTransactionDto>;
}