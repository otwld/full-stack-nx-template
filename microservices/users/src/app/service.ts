import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ];
  private id = 2;

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(payload: { name: string }) {
    const newUser = { id: `${++this.id}`, ...payload };
    this.users.push(newUser);
    return newUser;
  }
}
