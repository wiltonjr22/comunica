import { Module } from "@nestjs/common";
import { PrismaService } from "@/resources/database/prisma/prisma.service";
import { CommunicationController } from "./presentation/controllers/communication.controller";
import { CommunicationService } from "./application/services/communication.service";
import { ICommunicationService } from "./application/interfaces/communication.service";
import { ICommunicationRepository } from "./infra/interfaces/communication.repository";
import { CommunicationRepository } from "./infra/repositories/communication.repository";

@Module({
  controllers: [CommunicationController],
  providers: [
    PrismaService,
    {
      provide: ICommunicationService,
      useClass: CommunicationService,
    },
    {
      provide: ICommunicationRepository,
      useClass: CommunicationRepository,
    },
  ],
  exports: [ICommunicationService, ICommunicationRepository],
})
export class CommunicationModule { }
