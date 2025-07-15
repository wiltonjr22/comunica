import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  Query,
  Logger,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { CreateCommunicationDto } from "../dtos/create.dto";
import { UpdateCommunicationDto } from "../dtos/update.dto";
import { CommunicationFilterDto } from "../dtos/get.dto";
import { CommunicationEntity } from "../../commom/entities/communication.entities";
import { ICommunicationService } from "../../application/interfaces/communication.service";
import { RolesGuard } from "@/contexts/auth/application/services/roles.guard";
import { Roles } from "@/contexts/auth/application/services/roles";

@ApiTags("Comunicados")
  @ApiBearerAuth("access-token")
@Controller("comunicados")
@UseGuards(RolesGuard)
export class CommunicationController {
  private readonly logger = new Logger(CommunicationController.name);

  constructor(private readonly communicationService: ICommunicationService) { }

  @Post()
  @Roles("ADMIN", "ROOT", "CLIENT")
  @ApiOperation({ summary: "Criação de comunicado" })
  @ApiBody({ type: CreateCommunicationDto })
  @ApiResponse({ status: 201, description: "Comunicado criado com sucesso." })
  async create(@Body() dto: CreateCommunicationDto) {
    this.logger.log("Requisição recebida para criar um novo comunicado.");
    return this.communicationService.create(dto);
  }

  @Get()
  @Roles("ADMIN", "ROOT")
  @ApiOperation({ summary: "Listar todos comunicados" })
  @ApiQuery({ name: "status", required: false, description: "Filtrar por status do comunicado", example: "PUBLISHED" })
  @ApiQuery({ name: "tipo_canal", required: false, description: "Filtrar por tipo de canal", example: "EMAIL" })
  @ApiQuery({ name: "autor", required: false, description: "Filtrar por autor", example: "João da Silva" })
  @ApiQuery({ name: "data_criacao_inicio", required: false, type: String, description: "Data inicial de criação (ISO 8601)", example: "2025-07-01T00:00:00.000Z" })
  @ApiQuery({ name: "data_criacao_fim", required: false, type: String, description: "Data final de criação (ISO 8601)", example: "2025-07-31T23:59:59.000Z" })
  @ApiQuery({ name: "data_envio_inicio", required: false, type: String, description: "Data inicial de envio (ISO 8601)", example: "2025-07-01T00:00:00.000Z" })
  @ApiQuery({ name: "data_envio_fim", required: false, type: String, description: "Data final de envio (ISO 8601)", example: "2025-07-31T23:59:59.000Z" })
  @ApiQuery({ name: "limit", required: false, description: "Número máximo de itens por página", example: 10, type: Number })
  @ApiQuery({ name: "offset", required: false, description: "Número de itens para pular (offset da paginação)", example: 0, type: Number })
  @ApiResponse({ status: 200, description: "Lista de comunicados retornada com sucesso." })
  async findAll(@Query() filter: CommunicationFilterDto): Promise<{ data: CommunicationEntity[]; total: number }> {
    this.logger.log("Requisição recebida para listar comunicados com filtros.");
    return this.communicationService.findAll(filter);
  }

  @Get(":id")
  @Roles("ADMIN", "ROOT")
  @ApiOperation({ summary: "Buscar comunicado por ID" })
  @ApiParam({ name: "id", description: "ID do comunicado", example: "abc123" })
  @ApiResponse({ status: 200, description: "Comunicado encontrado com sucesso." })
  @ApiResponse({ status: 404, description: "Comunicado não encontrado." })
  async findOne(@Param("id") id: string) {
    this.logger.log(`Requisição recebida para buscar comunicado com ID: ${id}`);
    return this.communicationService.findOne(id);
  }

  @Put(":id")
  @Roles("ADMIN", "ROOT", "CLIENT")
  @ApiOperation({ summary: "Atualizar comunicado pelo ID" })
  @ApiParam({ name: "id", description: "ID do comunicado", example: "abc123" })
  @ApiBody({ type: UpdateCommunicationDto })
  @ApiResponse({ status: 200, description: "Comunicado atualizado com sucesso." })
  @ApiResponse({ status: 404, description: "Comunicado não encontrado." })
  async update(@Param("id") id: string, @Body() dto: UpdateCommunicationDto) {
    this.logger.log(`Requisição recebida para atualizar comunicado com ID: ${id}`);
    return this.communicationService.update(id, dto);
  }

  @Delete(":id")
  @Roles("ADMIN", "ROOT", "CLIENT")
  @ApiOperation({ summary: "Excluir (inativar) comunicado por ID" })
  @ApiParam({ name: "id", description: "ID do comunicado", example: "abc123" })
  @ApiResponse({ status: 200, description: "Comunicado inativado com sucesso." })
  @ApiResponse({ status: 404, description: "Comunicado não encontrado." })
  async remove(@Param("id") id: string) {
    this.logger.log(`Requisição recebida para excluir (inativar) comunicado com ID: ${id}`);
    return this.communicationService.remove(id);
  }
}
