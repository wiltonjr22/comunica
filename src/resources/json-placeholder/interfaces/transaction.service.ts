import { GetTransactionDto } from "../domain/dtos/transaction.dto";
import { TransactionEntity } from "../domain/entity/transaction";

export interface ITransactionService {
  getTransaction(): Promise<GetTransactionDto>;
}

export interface CacheEntry {
  data: TransactionEntity;
  expiresAt: number;
}