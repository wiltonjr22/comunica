import { IntegrationController } from './integration.controller';
import { IIntegrationService } from '../../application/interfaces/integration.service';
import { GetTransactionDto } from '../dtos/integration.dto';

describe('IntegrationController', () => {
  let integrationController: IntegrationController;
  let integrationService: IIntegrationService;

  const mockTransaction: GetTransactionDto = {
    userId: 1,
    id: 100,
    title: 'Transação de teste',
    completed: true,
  };

  beforeEach(() => {
    integrationService = {
      getTransaction: jest.fn().mockResolvedValue(mockTransaction),
    } as unknown as IIntegrationService;

    integrationController = new IntegrationController(integrationService);
  });

  it('should be defined', () => {
    expect(integrationController).toBeDefined();
  });

  describe('find', () => {
    it('should return transaction data from service', async () => {
      const result = await integrationController.find();

      expect(integrationService.getTransaction).toHaveBeenCalled();
      expect(result).toEqual(mockTransaction);
    });
  });
});
