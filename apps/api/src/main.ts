import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const PORT = process.env.PORT;

async function bootstrap() {
    if (!PORT) {
        console.error(
            "Error: PORT environment variable is not defined. Server shutting down.",
        );
        return;
    }

    const app = await NestFactory.create(AppModule);
    await app.listen(PORT);
}

bootstrap();
