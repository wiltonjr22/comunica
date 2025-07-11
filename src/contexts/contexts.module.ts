import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { CommunicationModule } from "./communication/communication.module";
import { IntegrationModule } from "./fake-integration/integration.module";

@Module({
  imports: [HealthModule,
    CommunicationModule,
    IntegrationModule
  ],
})
export class ContextsModule { }