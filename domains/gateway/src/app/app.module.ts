import {Module} from '@nestjs/common';
import {GraphQLModule} from '@agency-quest/nestjs-graphql';
import {UsersModule} from './modules/users/users.module';
import {ClientsModule, Transport} from "@nestjs/microservices";
import { join } from 'path';

@Module({
  imports: [
    // Core
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, '../../')
    }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE', // Custom name for the service
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://stagingUser:stagingPassword@rabbitmq.agency-quest-staging.svc.cluster.local:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),

    // Modules
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
