import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../resources/database/prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) { }

  @Get()
  async getHealth() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', database: 'up' };
    } catch (error) {
      return { status: 'error', database: 'down', error: error.message };
    }
  }
}