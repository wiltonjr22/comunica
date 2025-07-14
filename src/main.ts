import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import AddSwagger from "./resources/swagger/add-swagger";
import { JwtAuthGuard } from "./contexts/auth/application/services/jwt-auth.guard";
import { HttpExceptionFilter } from "./resources/errors-handler";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new HttpExceptionFilter());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const configService = app.get(ConfigService);
  const port = process.env.PORT ?? 3000;

  app.enableCors({
    origin: configService.get("ALLOWED_ORIGINS", "*").split(","),
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  AddSwagger(app);

  await app.listen(port, () =>
    Logger.log(
      `Listening for API calls on port \x1b[33m${port} 💻\x1b[37m`,
      "NestApplication"
    )
  );
}
bootstrap();