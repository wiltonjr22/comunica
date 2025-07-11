import { Inject, Injectable } from "@nestjs/common";
import { IIntegrationService } from "../interfaces/integration.service";
import { GetTransactionDto } from "../../presentation/dtos/integration.dto";
import { TransactionService } from "@/resources/json-placeholder/services/transaction.service";
import { ITransactionService } from "@/resources/json-placeholder/interfaces/transaction.service";

@Injectable()
export class IntegrationService implements IIntegrationService {
  constructor(
    @Inject(TransactionService)
    private readonly transactionService: ITransactionService,
  ) {

  }

  async getTransaction(): Promise<GetTransactionDto> {
    return this.transactionService.getTransaction();
  }
}

