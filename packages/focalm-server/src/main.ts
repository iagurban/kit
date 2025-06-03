import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './modules/app.module';

declare const module: { hot: { accept: () => void; dispose: (callback: () => void) => void } };

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true, // если используешь куки или авторизацию
    },
  });

  app.use(cookieParser());

  await app.listen(process.env['PORT'] ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
void bootstrap();
