import { GetTransactionDto } from "../domain/dtos/transaction.dto";

export interface ITransactionService {
  getTransaction(): Promise<GetTransactionDto>;
}