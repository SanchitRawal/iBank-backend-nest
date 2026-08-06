import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { DashBoardService } from './dashBoard.service';
import { DashBoardController } from './dashBoard.controller';
import { Accounts, AccountSchema } from 'src/accounts/schemas/account.schema';
import { Cards, CardsSchema } from 'src/cards/schema/cards.schema';
import {
  Transactions,
  TransactionSchema,
} from 'src/transactions/schema/transaction.schema';
import { Notifications, NotificationSchema } from 'src/notifications/schema/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Accounts.name, schema: AccountSchema },
      { name: Cards.name, schema: CardsSchema },
      { name: Transactions.name, schema: TransactionSchema },
      { name: Notifications.name, schema: NotificationSchema },
    ]),
  ],
  providers: [DashBoardService],
  controllers: [DashBoardController],
})
export class DashBoardModule {}
