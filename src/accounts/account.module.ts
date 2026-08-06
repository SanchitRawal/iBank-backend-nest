import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountsService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Accounts, AccountSchema } from './schemas/account.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Accounts.name, schema: AccountSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountsService],
})
export class AccountsModule {}
