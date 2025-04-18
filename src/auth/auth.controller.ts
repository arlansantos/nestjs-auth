import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { LoginDto } from './dto/login.dto';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorator/roles.decorator';
import { Role } from './enum/role.enum';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(@Body() loginDto: LoginDto){
    return this.authService.signIn(loginDto.username, loginDto.password)
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Roles(Role.Admin)
  @Get('profile/admin')
  getProfileAdmin(@Request() req) {
    return req.user;
  }

}
