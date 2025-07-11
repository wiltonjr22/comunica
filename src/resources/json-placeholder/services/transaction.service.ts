import { Injectable } from '@nestjs/common';
import { GetTransactionDto } from '../domain/dtos/transaction.dto';
import { ITransactionService } from '../interfaces/transaction.service';
import { TransactionHttpService } from './transaction-http.service';
import { TransactionEntity } from '../domain/entity/transaction';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    private transactionHttpService: TransactionHttpService,
  ) { }

  async getTransaction(): Promise<GetTransactionDto> {
    try {
      const path = `/todos/1`;
      const response = await this.transactionHttpService.get<TransactionEntity>(
        path,
      );

      return response;
    } catch (error) {
      throw new Error('Failed to get transaction status');
    }
  }
}