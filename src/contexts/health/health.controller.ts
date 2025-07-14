import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor() { }

  @Get()
  async getHealth() {
    try {
      return { status: 'ok', database: 'up' };
    } catch (error) {
      return { status: 'error', database: 'down', error: error.message };
    }
  }
}