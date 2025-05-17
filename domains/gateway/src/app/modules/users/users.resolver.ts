import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersAPI } from './users-api.service';
import { User } from '@agency-quest/nestjs-users-service';
import { CreateUserDto } from './dtos/create-user.dto';
import { map, Observable } from 'rxjs';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersAPI: UsersAPI) {}

  @Query(() => User)
  getUserById(@Args('id') id: string): Observable<User | null | undefined> {
    return this.usersAPI.emit.GetById({ id }).pipe(
      map((user) =>
        user
          ? {
              ...user,
              createdAt: new Date(user.createdAt),
              updatedAt: new Date(user.updatedAt),
            }
          : undefined,
      ),
    );
  }

  @Query(() => [User])
  getAllUsers(): Observable<User[]> {
    return this.usersAPI.emit.GetAll({}).pipe(
      map((users) =>
        users.map((user) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        })),
      ),
    );
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Observable<User> {
    console.info('create user 1');
    return this.usersAPI.emit.Create(createUserInput).pipe(
      map((user) => ({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      })),
    );
  }
}
