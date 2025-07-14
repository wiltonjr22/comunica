import { Module } from "@nestjs/common";
import { IntegrationController } from "./presentation/controllers/integration.controller";
import { IntegrationService } from "./application/services/integration.service";
import { IIntegrationService } from "./application/interfaces/integration.service";
import { TransactionModule } from "@/resources/json-placeholder/json-placeholder.module";

@Module({
  imports: [TransactionModule],
  controllers: [IntegrationController],
  providers: [
    {
      provide: IIntegrationService,
      useClass: IntegrationService,
    },
  ],
  exports: [IIntegrationService],
})
export class IntegrationModule { }
