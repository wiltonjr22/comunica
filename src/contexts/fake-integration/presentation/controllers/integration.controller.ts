import { Controller, Get, Logger } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { IIntegrationService } from "../../application/interfaces/integration.service";
import { Roles } from "@/contexts/auth/application/services/roles";

@ApiTags("Integracao")
@ApiBearerAuth('access-token')
@Controller("integracao")
export class IntegrationController {
  private readonly logger = new Logger(IntegrationController.name);

  constructor(private readonly integrationService: IIntegrationService) { }

  @Get()
  @Roles('ADMIN', 'ROOT')
  @ApiOperation({ summary: "Conectando integracao" })
  async find() {
    this.logger.log("Requisição recebida para buscar dados da integração fake.");
    return this.integrationService.getTransaction();
  }
}