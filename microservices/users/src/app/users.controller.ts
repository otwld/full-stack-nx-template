import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersContract } from './users.contract';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create_user')
  create(
    @Payload() payload: UsersContract['Create']['Request'],
  ): UsersContract['Create']['Response'] {
    console.info('create_user:', payload);
    return this.usersService.create(payload);
  }

  @MessagePattern('get_user_by_id')
  getById(
    @Payload() payload: UsersContract['GetById']['Request'],
  ): UsersContract['GetById']['Response'] {
    console.info('get_user_by_id:', payload);
    return this.usersService.findOne(payload.id);
  }
}
