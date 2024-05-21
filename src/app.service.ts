import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { configAs } from './environments.config'

@Injectable()
export class AppService {
  constructor(
    @Inject(configAs.KEY) private configService: ConfigType<typeof configAs>
  ){}

  getHello(): string {
    console.log(this.configService.dataBasePg.user)
    return 'Hi, Jose!';
  }

  getHelloWithLastName(name: string, age: number, myLimit: number): string {
    return `Hello, ${name} and my age is ${age}, limit: ${myLimit}!`;
  }
}
