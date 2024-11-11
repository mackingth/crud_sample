import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 設定を追加
  app.enableCors({
    origin: '*', // どこからでもアクセス可能にする（セキュリティ上の懸念がある場合、特定のオリジンに制限することも可能）
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
