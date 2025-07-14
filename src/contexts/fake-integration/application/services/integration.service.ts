import { Inject, Injectable, Logger } from "@nestjs/common";
import { IIntegrationService } from "../interfaces/integration.service";
import { GetTransactionDto } from "../../presentation/dtos/integration.dto";
import { TransactionService } from "@/resources/json-placeholder/services/transaction.service";
import { ITransactionService } from "@/resources/json-placeholder/interfaces/transaction.service";

@Injectable()
export class IntegrationService implements IIntegrationService {
  private readonly logger = new Logger(IntegrationService.name);

  constructor(
    @Inject(TransactionService)
    private readonly transactionService: ITransactionService,
  ) { }

  async getTransaction(): Promise<GetTransactionDto> {
    this.logger.log("Iniciando integração para obter transação");

    try {
      const transaction = await this.transactionService.getTransaction();
      this.logger.log("Transação obtida com sucesso.");
      return transaction;
    } catch (error) {
      this.logger.error("Erro ao obter transação via integração:", error.stack);
      throw error;
    }
  }
}
