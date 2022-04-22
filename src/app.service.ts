import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('Api_key') private apiKey: any,
    @Inject('Api_Json') private tasks: any[],
  ) {}

  getHello(): string {
    console.log(this.tasks);
    return 'Hello World!' + '' + this.apiKey[0].name;
  }
}
