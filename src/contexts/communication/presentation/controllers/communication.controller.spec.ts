import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { CommunicationController } from './communication.controller';
import { ICommunicationService } from '../../application/interfaces/communication.service';
import { CreateCommunicationDto } from '../dtos/create.dto';
import { CommunicationFilterDto } from '../dtos/get.dto';
import { CommunicationEntity } from '../../commom/entities/communication.entities';
import { UpdateCommunicationDto } from '../dtos/update.dto';

describe('CommunicationController', () => {
  let controller: CommunicationController;
  let service: jest.Mocked<ICommunicationService>;

  beforeEach(async () => {
    const serviceMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationController],
      providers: [
        { provide: ICommunicationService, useValue: serviceMock },
      ],
    }).compile();

    controller = module.get<CommunicationController>(CommunicationController);
    service = module.get(ICommunicationService);

    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve chamar service.create com o dto', async () => {
      const dto: CreateCommunicationDto = { titulo: 'Título', conteudo: 'Conteúdo' } as any;
      service.create.mockResolvedValue(undefined);

      await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('deve chamar service.findAll com o filtro e retornar resultado', async () => {
      const filter: CommunicationFilterDto = { status: 'ativo' } as any;
      const response = { data: [{ id: '1' } as CommunicationEntity], total: 1 };
      service.findAll.mockResolvedValue(response);

      const result = await controller.findAll(filter);

      expect(service.findAll).toHaveBeenCalledWith(filter);
      expect(result).toEqual(response);
    });
  });

  describe('findOne', () => {
    it('deve chamar service.findOne com id e retornar resultado', async () => {
      const id = 'abc123';
      const entity = { id } as CommunicationEntity;
      service.findOne.mockResolvedValue(entity);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(entity);
    });
  });

  describe('update', () => {
    it('deve chamar service.update com id e dto', async () => {
      const id = 'abc123';
      const dto: UpdateCommunicationDto = { titulo: 'Novo título' } as any;
      const updatedEntity = { id, ...dto } as CommunicationEntity;
      service.update.mockResolvedValue(updatedEntity);

      const result = await controller.update(id, dto);

      expect(service.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(updatedEntity);
    });
  });

  describe('remove', () => {
    it('deve chamar service.remove com id', async () => {
      const id = 'abc123';
      service.remove.mockResolvedValue(undefined);

      await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
