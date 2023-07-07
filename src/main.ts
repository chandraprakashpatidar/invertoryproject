import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {setupSwagger} from './swagger.config'
import * as multer from 'multer';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 setupSwagger(app);
 //app.use(multer({dest:'uploads'}).single('file'))
  await app.listen(3001);
}
bootstrap();
