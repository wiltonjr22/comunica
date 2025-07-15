import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function AddSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Comunica')
    .setDescription('API documentation for Comunica')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    );

  if (process.env.NODE_ENV !== 'production') {
    config.addTag('Development Environment');
  }

  const document = SwaggerModule.createDocument(app, config.build());

  SwaggerModule.setup('swagger', app, document);
}
