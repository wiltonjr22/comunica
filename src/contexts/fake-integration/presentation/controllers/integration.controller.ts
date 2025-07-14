import { Controller, Get, Logger } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { IntegrationService } from "../../application/services/integration.service";
import { IIntegrationService } from "../../application/interfaces/integration.service";

@ApiTags("Integracao")
@Controller("integracao")
export class IntegrationController {
  private readonly logger = new Logger(IntegrationController.name);

  constructor(private readonly integrationService: IIntegrationService) { }

  @Get()
  @ApiOperation({ summary: "Conectando integracao" })
  async find() {
    this.logger.log("Requisição recebida para buscar dados da integração fake.");
    return this.integrationService.getTransaction();
  }
}