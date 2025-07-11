import { Module } from "@nestjs/common";
import { IntegrationController } from "./presentation/controllers/integration.controller";
import { IntegrationService } from "./application/services/integration.service";
import { TransactionModule } from "@/resources/json-placeholder/json-placeholder.module";

@Module({
  imports: [TransactionModule],
  controllers: [IntegrationController],
  providers: [
    IntegrationService,
  ],
  exports: [IntegrationService],
})
export class IntegrationModule { }