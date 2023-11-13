import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import env from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT, () => {
    console.log(`
🚀 ${env.APP}
is running on http://127.0.0.1:${env.PORT}`);
  });
}
void bootstrap();
