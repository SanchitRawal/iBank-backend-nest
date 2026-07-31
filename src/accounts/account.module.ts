import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountsService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [
    AccountsModule,
  ],
  controllers: [AccountController],
  providers: [AccountsService],
})
export class AccountsModule {}