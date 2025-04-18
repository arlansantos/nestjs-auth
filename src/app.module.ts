import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/guard/auth.guard';
import { RolesGuard } from './auth/guard/roles.guard';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard
    }
  ],
})
export class AppModule {}
