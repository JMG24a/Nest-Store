import { Body, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('home/:id')
  getHello(@Param('id') id: string, @Body() body: any): string {
    return this.appService.getHello();
  }
}
