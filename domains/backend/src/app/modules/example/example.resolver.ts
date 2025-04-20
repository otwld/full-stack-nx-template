import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ExampleResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
