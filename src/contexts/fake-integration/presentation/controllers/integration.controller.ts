import { Controller, Get, Logger, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from "@nestjs/swagger";
import { IIntegrationService } from "../../application/interfaces/integration.service";
import { Roles } from "@/contexts/auth/application/services/roles";
import { RolesGuard } from "@/contexts/auth/application/services/roles.guard";
import { GetTransactionDto } from "../dtos/integration.dto";

@ApiTags("Integração")
@ApiBearerAuth("access-token")
@UseGuards(RolesGuard)
@Controller("integracao")
export class IntegrationController {
  private readonly logger = new Logger(IntegrationController.name);

  constructor(private readonly integrationService: IIntegrationService) { }

  @Get()
  @Roles("ADMIN", "ROOT")
  @ApiOperation({ summary: "Buscar dados da integração" })
  @ApiResponse({
    status: 200,
    description: "Dados da integração retornados com sucesso.",
    type: GetTransactionDto,
  })
  @ApiResponse({
    status: 403,
    description: "Acesso negado. Token inválido ou sem permissão.",
  })
  async find(): Promise<GetTransactionDto> {
    this.logger.log("Requisição recebida para buscar dados da integração fake.");
    return this.integrationService.getTransaction();
  }
}
