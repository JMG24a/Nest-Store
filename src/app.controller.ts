import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api_key.guard'
import { Public } from './auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello/world/:name/:age')
  getHelloWithLastName(
    @Param('name') name: string,
    @Param('age') age: number,
    @Query('myLimit') myLimit = 0): string {
    return this.appService.getHelloWithLastName(name, age, myLimit);
  }
}
