import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('Api_Json') private tasks: any[],
  ) {}

  getHello(): string {
    console.log(this.tasks);
    return 'Hello World!' + ' ' + this.configService.apiKey;
  }
}
