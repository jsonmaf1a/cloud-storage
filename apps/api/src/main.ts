import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { useContainer } from "class-validator";
import { GeneralConfig } from "./config/general.config";
import { ConfigService } from "@nestjs/config";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import validationOptions from "./common/utils/validation-options";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ResolvePromisesInterceptor } from "./common/utils/serializer.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const configService = app.get(ConfigService<GeneralConfig>);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.enableShutdownHooks();
    app.setGlobalPrefix(
        configService.getOrThrow("app.apiPrefix", { infer: true }),
        {
            exclude: ["/"],
        },
    );

    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.useGlobalInterceptors(
        // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
        // https://github.com/typestack/class-transformer/issues/549
        new ResolvePromisesInterceptor(),
        new ClassSerializerInterceptor(app.get(Reflector)),
    );

    const options = new DocumentBuilder()
        .setTitle("Cloud Storage API")
        .setDescription("Cloud Storage API docs")
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("docs", app, document);

    await app.listen(configService.getOrThrow("app.port", { infer: true }));
}

void bootstrap();
