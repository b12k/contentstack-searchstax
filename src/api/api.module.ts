import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import env from '../env';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [
    HttpModule.register({
      baseURL: env.SEARCHSTAX_API_URL,
      headers: {
        Authorization: `Token ${env.SEARCHSTAX_API_TOKEN_WRITE}`,
      },
    }),
  ],
})
export class ApiModule {}
