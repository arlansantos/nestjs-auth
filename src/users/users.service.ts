import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enum/role.enum';

export interface User{
  id: number,
  username: string,
  password: string,
  roles: Role[],
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'pass1',
      roles: [Role.Admin]
    },
    {
      id: 2,
      username: 'chris', 
      password: 'pass2',
      roles: [Role.User]
    }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

}
