import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get application data', description: 'Returns basic application information' })
  @ApiResponse({ status: 200, description: 'Application data retrieved successfully' })
  @Get()
  getData() {
    return this.appService.getData();
  }
}
