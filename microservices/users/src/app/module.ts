import { Module } from '@nestjs/common';
import { UsersService } from './service';
import { UsersController } from './controller';
import { env, safeEnv } from '@agency-quest/sdk';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(safeEnv('MONGODB_URI'), {
      auth: {
        username: safeEnv('MONGODB_USERNAME'),
        password: safeEnv('MONGODB_PASSWORD'),
      },
      authSource: env('MONGODB_AUTH_SOURCE'),
    }),
    MongooseModule.forFeature([{name: UserEntity}])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
