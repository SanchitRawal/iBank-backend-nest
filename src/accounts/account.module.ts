import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountsService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Accounts, AccountSchema } from './schemas/account.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Accounts.name, schema: AccountSchema}])],
  controllers: [AccountController],
  providers: [AccountsService],
})
export class AccountsModule {}