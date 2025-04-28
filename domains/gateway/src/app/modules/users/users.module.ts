import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersAPI } from './users-api.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE', // Custom name for the service
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqp://stagingUser:stagingPassword@rabbsitmq.agency-quest-staging.svc.cluster.local:5672',
          ],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],

  providers: [UsersResolver, UsersAPI],
})
export class UsersModule {}
