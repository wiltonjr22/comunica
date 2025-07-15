import { IntegrationService } from './integration.service';
import { Logger } from '@nestjs/common';
import { ITransactionService } from '@/resources/json-placeholder/interfaces/transaction.service';
import { GetTransactionDto } from '../../presentation/dtos/integration.dto';

describe('IntegrationService', () => {
  let integrationService: IntegrationService;
  let transactionService: ITransactionService;

  const mockTransaction: GetTransactionDto = {
    id: 1,
    userId: 10,
    title: 'Test Transaction',
    completed: true,
  };

  beforeEach(() => {
    // Mockando transactionService
    transactionService = {
      getTransaction: jest.fn().mockResolvedValue(mockTransaction),
    };

    integrationService = new IntegrationService(transactionService);
  });

  it('should be defined', () => {
    expect(integrationService).toBeDefined();
  });

  describe('getTransaction', () => {
    it('should return a transaction when successful', async () => {
      const result = await integrationService.getTransaction();

      expect(transactionService.getTransaction).toHaveBeenCalled();
      expect(result).toEqual(mockTransaction);
    });

    it('should log and throw error if transaction fails', async () => {
      const error = new Error('Failed to fetch');
      jest.spyOn(transactionService, 'getTransaction').mockRejectedValue(error);

      await expect(integrationService.getTransaction()).rejects.toThrow('Failed to fetch');
    });
  });
});
