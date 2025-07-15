import { Controller, Get, Post, Delete, Param, Body, Put, Query, Logger, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { CreateCommunicationDto } from "../dtos/create.dto";
import { UpdateCommunicationDto } from "../dtos/update.dto";
import { CommunicationFilterDto } from "../dtos/get.dto";
import { CommunicationEntity } from "../../commom/entities/communication.entities";
import { ICommunicationService } from "../../application/interfaces/communication.service";
import { RolesGuard } from "@/contexts/auth/application/services/roles.guard";
import { Roles } from "@/contexts/auth/application/services/roles";

@ApiTags("Comunicados")
@ApiBearerAuth('access-token')
@Controller("comunicados")
@UseGuards(RolesGuard)
export class CommunicationController {
  private readonly logger = new Logger(CommunicationController.name);

  constructor(private readonly communicationService: ICommunicationService) { }

  @Post()
  @Roles('ADMIN', 'ROOT', 'CLIENT')
  @ApiOperation({ summary: "Criação de comunicado" })
  async create(@Body() dto: CreateCommunicationDto) {
    this.logger.log("Requisição recebida para criar um novo comunicado.");
    return this.communicationService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'ROOT')
  @ApiOperation({ summary: "Listar todos comunicados" })
  async findAll(@Query() filter: CommunicationFilterDto): Promise<{ data: CommunicationEntity[]; total: number }> {
    this.logger.log("Requisição recebida para listar comunicados com filtros.");
    return this.communicationService.findAll(filter);
  }

  @Get(":id")
  @Roles('ADMIN', 'ROOT')
  @ApiOperation({ summary: "Encontrar unico comunicado" })
  async findOne(@Param("id") id: string) {
    this.logger.log(`Requisição recebida para buscar comunicado com ID: ${id}`);
    return this.communicationService.findOne(id);
  }

  @Put(":id")
  @Roles('ADMIN', 'ROOT', 'CLIENT')
  @ApiOperation({ summary: "Atualizar comunicado pelo id" })
  async update(@Param("id") id: string, @Body() dto: UpdateCommunicationDto) {
    this.logger.log(`Requisição recebida para atualizar comunicado com ID: ${id}`);
    return this.communicationService.update(id, dto);
  }

  @Delete(":id")
  @Roles('ADMIN', 'ROOT', 'CLIENT')
  @ApiOperation({ summary: "Deletar comunicado" })
  async remove(@Param("id") id: string) {
    this.logger.log(`Requisição recebida para excluir (inativar) comunicado com ID: ${id}`);
    return this.communicationService.remove(id);
  }
}