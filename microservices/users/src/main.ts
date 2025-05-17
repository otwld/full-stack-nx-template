import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {UsersModule} from './app/module';

function safeEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`[safeEnv]: env variable "${key}" is required`);

  return value;
}

function safeEnvArray(key: string): string[] {
  return safeEnv(key).split(',');
}

async function bootstrap() {
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
      transport: Transport.RMQ,
      options: {
        urls: safeEnvArray('RABBITMQ_URLS'),
        queue: 'users_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  await microservice.listen();
}

bootstrap();
