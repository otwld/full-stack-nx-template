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
  private readonly api = createRpcApi<
    typeof UsersPatterns,
    ExtractContracts<UsersContract>
  >(this.client, UsersPatterns);

  constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy) {}

  getById = this.api.GetById;
  create = this.api.Create;
}
