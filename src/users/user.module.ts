import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './user.controller';
import { Accounts, AccountSchema } from 'src/accounts/schemas/account.schema';
import { Cards, CardsSchema } from 'src/cards/schema/cards.schema';
import {
  Beneficiaries,
  BeneficiariesSchema,
} from 'src/beneficiaries/schema/beneficiaries.schema';
import { Notifications, NotificationSchema } from 'src/notifications/schema/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Accounts.name, schema: AccountSchema },
      { name: Cards.name, schema: CardsSchema },
      { name: Beneficiaries.name, schema: BeneficiariesSchema },
      { name: Notifications.name, schema: NotificationSchema },
    ]),
  ],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule {}
