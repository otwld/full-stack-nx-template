import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UsersAPI} from './users-api.service';
import {User} from "@agency-quest/nestjs-users-service";

@Resolver()
export class UsersResolver {
  constructor(private readonly usersAPI: UsersAPI) {}

  @Query(() => User)
  async getUserById(@Args('id') id: string) {
    return this.usersAPI.getById({ id });
  }

  @Mutation(() => User)
  async createUser(@Args('name') name: string) {
    return this.usersAPI.create({ name });
  }
}
