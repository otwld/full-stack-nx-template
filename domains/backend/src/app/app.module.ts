import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@full-stack-nestjs-template/nestjs-graphql';
import { ExampleModule } from './modules/example/example.module';

@Module({
  imports: [
    // Core
    GraphQLModule.forRoot(),

    // Modules
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
