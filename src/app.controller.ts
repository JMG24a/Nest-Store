import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
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
