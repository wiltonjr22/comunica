import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { CommunicationModule } from "./communication/communication.module";

@Module({
  imports: [HealthModule,
    CommunicationModule
  ],
})
export class ContextsModule { }