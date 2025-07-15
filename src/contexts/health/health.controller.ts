import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/presentation/controllers/public.jwt';

@Controller('health')
export class HealthController {
  constructor() { }

  @Public()
  @Get()
  async getHealth() {
    try {
      return { status: 'ok', database: 'up' };
    } catch (error) {
      return { status: 'error', database: 'down', error: error.message };
    }
  }
}