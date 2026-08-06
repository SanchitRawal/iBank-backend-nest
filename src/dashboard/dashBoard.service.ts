import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accounts } from 'src/accounts/schemas/account.schema';
import { Cards } from 'src/cards/schema/cards.schema';
import { Notifications } from 'src/notifications/schema/notification.schema';
import { Transactions } from 'src/transactions/schema/transaction.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class DashBoardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Accounts.name) private accountModel: Model<Accounts>,
    @InjectModel(Cards.name) private cardModel: Model<Cards>,
    @InjectModel(Transactions.name)
    private transactionModel: Model<Transactions>,
    @InjectModel(Notifications.name)
    private notificationModel: Model<Notifications>,
  ) {}

  async dashBoardDetails(userId: string) {
    const [user, accounts, cards, transaction, notifications] =
      await Promise.all([
        this.userModel.findById(userId).select('firstName'),
        this.accountModel.find({ userId }),
        this.cardModel.find().populate({
          path: 'accountId',
          select: 'holderName cvv expiry number',
        }),
        this.transactionModel.find().populate({
          path: 'fromAccountId',
          select: 'amount note',
        }),
        this.notificationModel.find({ userId }),
      ]);

    return {
      user,
      accounts,
      cards,
      transaction,
      notifications,
    };
  }
}
