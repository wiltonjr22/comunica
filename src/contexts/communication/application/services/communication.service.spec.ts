import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, Logger } from '@nestjs/common';
import { ICommunicationRepository } from '../../infra/interfaces/communication.repository';
import { CommunicationService } from './communication.service';
import { CommunicationEntity } from '../../commom/entities/communication.entities';

describe('CommunicationService', () => {
  let service: CommunicationService;
  let repository: jest.Mocked<ICommunicationRepository>;

  beforeEach(async () => {
    const repositoryMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunicationService,
        { provide: ICommunicationRepository, useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<CommunicationService>(CommunicationService);
    repository = module.get(ICommunicationRepository);

    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => { });
    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um comunicado', async () => {
      const dto = { titulo: 'titulo', conteudo: 'conteudo' } as any;
      repository.create.mockResolvedValue(undefined);

      await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('deve retornar comunicados com total', async () => {
      const filter = { status: 'active' } as any;
      const result = { data: [{ id: '1' } as CommunicationEntity], total: 1 };
      repository.findAll.mockResolvedValue(result);

      const response = await service.findAll(filter);

      expect(repository.findAll).toHaveBeenCalledWith(filter);
      expect(response).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('deve retornar um comunicado existente', async () => {
      const id = 'abc123';
      const communication = { id } as CommunicationEntity;
      repository.findById.mockResolvedValue(communication);

      const response = await service.findOne(id);

      expect(repository.findById).toHaveBeenCalledWith(id);
      expect(response).toEqual(communication);
    });

    it('deve lançar NotFoundException se não encontrar', async () => {
      const id = 'abc123';
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toBeInstanceOf(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('deve atualizar um comunicado', async () => {
      const id = 'abc123';
      const updateDto = { titulo: 'novo titulo' } as any;
      const updatedEntity = { id, ...updateDto } as CommunicationEntity;
      repository.update.mockResolvedValue(updatedEntity);

      const response = await service.update(id, updateDto);

      expect(repository.update).toHaveBeenCalledWith(id, updateDto);
      expect(response).toEqual(updatedEntity);
    });
  });

  describe('remove', () => {
    it('deve inativar um comunicado', async () => {
      const id = 'abc123';
      repository.update.mockResolvedValue(undefined);

      await service.remove(id);

      expect(repository.update).toHaveBeenCalledWith(id, { active: false });
    });
  });
});
