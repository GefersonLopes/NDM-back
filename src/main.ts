import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.enableCors({
        origin: ['*'],
        methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
        allowedHeaders: [
            'Accept',
            'Accept-Version',
            'Content-Type',
            'Api-Version',
            'Origin',
            'X-Requested-With',
            'Authorization',
            'Access-Control-Allow-Headers',
            'Origin,Accept',
            'X-Requested-With',
            'Content-Type',
            'Access-Control-Request-Method',
            'Access-Control-Request-Headers',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Credentials',
            'Access-Control-Expose-Headers',
            'Access-Control-Allow-Methods',
        ],
        credentials: true,
        exposedHeaders: ['API-Token-Expiry'],
    });

    const config = new DocumentBuilder()
        .setTitle('API NDM')
        .setDescription('Technical test')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(3001);
}
bootstrap();
