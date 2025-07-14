import { TransactionHttpService } from './transaction-http.service';
import { Logger } from '@nestjs/common';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpService: jest.Mocked<TransactionHttpService>;
  let loggerLogSpy: jest.SpyInstance;
  let loggerWarnSpy: jest.SpyInstance;
  let loggerErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
    } as any;

    service = new TransactionService(httpService);

    loggerLogSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation(() => { });
    loggerWarnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => { });
    loggerErrorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation(() => { });

    (service as any).cache.clear();

    jest.spyOn(Date, 'now').mockReturnValue(1000);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('deve retornar dados do cache se válidos', async () => {
    const cacheKey = '/todos/1';
    const cachedData = { id: 1, title: 'cached' };

    (service as any).cache.set(cacheKey, { data: cachedData, expiresAt: 2000 });

    const result = await service.getTransaction();

    expect(loggerLogSpy).toHaveBeenCalledWith('Fallback: retornando dados do cache');
    expect(result).toEqual(cachedData);
    expect(httpService.get).not.toHaveBeenCalled();
  });

  it('deve obter transação com sucesso na primeira tentativa', async () => {
    const response = { id: 1, title: 'response' };
    httpService.get.mockResolvedValue(response);

    const promise = service.getTransaction();

    jest.runAllTimers();
    const result = await promise;

    expect(loggerLogSpy).toHaveBeenCalledWith('Tentativa 1 para obter transação');
    expect(loggerLogSpy).toHaveBeenCalledWith('Sucesso na tentativa 1');
    expect(result).toEqual(response);
    expect(httpService.get).toHaveBeenCalledTimes(1);
  });

  it('deve abortar requisição após timeout', async () => {
    const abortMock = jest.fn();

    global.AbortController = jest.fn(() => ({
      signal: 'signal',
      abort: abortMock,
    })) as any;

    httpService.get.mockImplementation(() => new Promise(() => { }));

    const promise = service.getTransaction();

    jest.advanceTimersByTime(service['TIMEOUT_MS']);

    expect(abortMock).toHaveBeenCalled();

    (global as any).AbortController = undefined;

    promise.catch(() => { });
  });
});
