import { HttpService, HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';

const API_KEY_PROD = 'useValue';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'USE_VALUE',
      useValue: API_KEY_PROD
    },
    {
      provide: 'TASK',
      useFactory: async (http: HttpService) => {
        const request = await http.get('https://jsonplaceholder.typicode.com/todos')
        return new Promise((resolve)=>{
          request.subscribe((response)=>{
            resolve(response.data);
          })
        })
      },
      inject: [HttpService]
    }
  ],
  exports: ['TASK', 'USE_VALUE'],
})
export class DataBaseModule {}
