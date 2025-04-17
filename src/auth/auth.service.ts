import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string
  ): Promise<{accessToken: string}> {

    const user = await this.usersService.findOne(username)

    if(user?.password !== pass){
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const payload = { sub: user.id, username: user.username, roles: user.roles };

    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
   
  }
}
