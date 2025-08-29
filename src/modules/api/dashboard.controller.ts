import { Controller, Get } from '@nestjs/common';
import external from '@/common/external';

@Controller('dashboard')
export class DashboardController {
  @Get()
  async getDashboard() {
    return {
      weather: await external.getWeather(),
    };
  }
}
