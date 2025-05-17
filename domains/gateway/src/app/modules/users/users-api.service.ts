// users-api.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  UsersContract,
  UsersPatterns,
} from '@agency-quest/nestjs-users-service';
import {
  createRpcApi,
  ExtractContracts,
} from '@agency-quest/nestjs-microservices';

@Injectable()
export class UsersAPI {
  public readonly emit = createRpcApi<
    typeof UsersPatterns,
    ExtractContracts<UsersContract>
  >(this.client, UsersPatterns);

  constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy) {}
}
