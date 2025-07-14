import { Injectable, Logger } from '@nestjs/common';
import { GetTransactionDto } from '../domain/dtos/transaction.dto';
import { CacheEntry, ITransactionService } from '../interfaces/transaction.service';
import { TransactionHttpService } from './transaction-http.service';
import { TransactionEntity } from '../domain/entity/transaction';

@Injectable()
export class TransactionService implements ITransactionService {
  private readonly logger = new Logger(TransactionService.name);
  private readonly cache = new Map<string, CacheEntry>();

  private readonly MAX_RETRIES = 3;
  private readonly BACKOFF_BASE_MS = 500;
  private readonly TIMEOUT_MS = 5000;
  private readonly CACHE_TTL_MS = 5 * 60 * 1000; 

  constructor(
    private readonly transactionHttpService: TransactionHttpService,
  ) { }

  async getTransaction(): Promise<GetTransactionDto> {
    const path = `/todos/1`;
    const cacheKey = path;

    const cached = this.cache.get(cacheKey);
    const now = Date.now();

    if (cached && cached.expiresAt > now) {
      this.logger.log(`Fallback: retornando dados do cache`);
      return cached.data;
    }

    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        this.logger.log(`Tentativa ${attempt} para obter transação`);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

        const response = await this.transactionHttpService.get<TransactionEntity>(path, {
          signal: controller.signal
        });

        clearTimeout(timeout);

        this.cache.set(cacheKey, {
          data: response,
          expiresAt: now + this.CACHE_TTL_MS
        });

        this.logger.log(`Sucesso na tentativa ${attempt}`);
        return response;
      } catch (error) {
        this.logger.warn(`Falha na tentativa ${attempt}: ${error.message}`);

        if (attempt < this.MAX_RETRIES) {
          const delay = this.BACKOFF_BASE_MS * 2 ** (attempt - 1);
          this.logger.log(`Aguardando ${delay}ms antes da próxima tentativa`);
          await new Promise(res => setTimeout(res, delay));
        } else {
          this.logger.error(`Todas as tentativas falharam`);

          if (cached) {
            this.logger.warn(`Fallback: usando cache antigo`);
            return cached.data;
          }

          throw {
            statusCode: 503,
            message: 'Serviço de transação indisponível após múltiplas tentativas',
            attempts: this.MAX_RETRIES,
            lastError: error.message,
          };
        }
      }
    }
  }
}
