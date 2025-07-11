import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { IntegrationService } from "../../application/services/integration.service";

@ApiTags("Fake integration")
@Controller("fake-integration")
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) { }

  @Get()
  @ApiOperation({ summary: "Fetch integration" })
  async find() {
    return this.integrationService.getTransaction();
  }

}