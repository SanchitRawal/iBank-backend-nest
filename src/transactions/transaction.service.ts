import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from './schema/transaction.schema';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Accounts } from 'src/accounts/schemas/account.schema';
import { TransactionHistoryDto } from './dto/transactionHistory.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transactions.name)
    private transactionModel: Model<Transactions>,

    @InjectModel(Accounts.name)
    private accountsModel: Model<Accounts>,
  ) {}

  async newTransactionDetails(transactionDetails: TransactionDto) {
    if (!transactionDetails) {
      throw new BadRequestException('add some data');
    }
    if (typeof transactionDetails?.cardId === 'string') {
      transactionDetails.cardId = new Types.ObjectId(transactionDetails.cardId);
    }
    if (typeof transactionDetails?.fromAccountId === 'string') {
      transactionDetails.fromAccountId = new Types.ObjectId(
        transactionDetails.fromAccountId,
      );
    }
    try {
      const newTransaction =
        await this.transactionModel.create(transactionDetails);
      return newTransaction.save();
    } catch (error) {
      throw new BadRequestException('unable to create a transaction');
    }
  }

  async getTransactionsList() {
    try {
      const list = await this.transactionModel.find();
      return list;
    } catch (error) {
      throw new BadRequestException('unable to fetch the transaction list');
    }
  }

  async partialUpdate(id: string, transactionDetails: TransactionDto) {
    if (!transactionDetails) {
      throw new BadRequestException('add some to update');
    }
    try {
      const transaction = await this.transactionModel.findByIdAndUpdate(
        id,
        transactionDetails,
        { new: true, runValidators: true },
      );
      return transaction;
    } catch (error) {
      throw new BadRequestException('unable to update the transaction');
    }
  }

  async getSingleTransactionDetails(id: string) {
    try {
      const transaction = await this.transactionModel.findById(id);
      return transaction;
    } catch (error) {
      throw new BadRequestException('unable to fetch the data.');
    }
  }

  async deleteTransaction(id: string) {
    const transaction = await this.transactionModel.findByIdAndDelete(id);
    if (!transaction) {
      throw new BadRequestException('unable to delete the transaction');
    }
    return { message: ' transaction deleted succesfully' };
  }

  async transferTransaction() {
    try {
      const tranferDetails = await this.transactionModel
        .find()
        .populate('fromAccountId');
      return tranferDetails;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAnalaytics() {
    const [result] = await this.transactionModel.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [
                { $eq: ['$mode', 'CREDIT'] },
                { $toDouble: '$amount' },
                0,
              ],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ['$mode', 'DEBIT'] }, { $toDouble: '$amount' }, 0],
            },
          },
          totalTransaction: {
            $sum: 1,
          },
          averageTransaction: {
            $avg: '$amount',
          },
        },
      },
    ]);
    const totalIncome = result?.totalIncome ?? 0;
    const totalExpense = result?.totalExpense ?? 0;

    return {
      totalIncome,
      totalExpense,
      totalNetIncome: totalIncome - totalExpense,
      totalTransactions: result?.totalTransaction ?? 0,
      averageTransaction: result?.averageTransaction ?? 0,
    };
  }

  async getTransactionHistories(
    userId: string,
    filters: TransactionHistoryDto,
  ) {
    try {
      const {
        page = 1,
        limit = 10,
        mode,
        status,
        fromDate,
        toDate,
        minAmount,
        maxAmount,
        search,
        sort,
      } = filters;

      const query: any = {
        userId: new Types.ObjectId(userId),
      };

      if (mode) {
        query.mode = mode;
      }

      if (status) {
        query.status = status;
      }

      if (fromDate || toDate) {
        query.createdAt = {};
        if (fromDate) {
          query.createdAt.$gte = new Date(fromDate);
        }

        if (toDate) {
          const endDate = new Date(toDate);
          endDate.setHours(23, 59, 59, 999);

          query.createdAt.$lte = endDate;
        }
      }

      if (maxAmount || minAmount) {
        query.amount = {};

        if (minAmount) {
          query.amount.$gte = Number(minAmount);
        }

        if (maxAmount) {
          query.amount.$lte = Number(maxAmount);
        }
      }

      if (search) {
        query.$or = [
          {
            transactionId: {
              $regex: search,
              $option: '1',
            },
          },
          {
            note: {
              $regex: search,
              $options: '1',
            },
          },
        ];
      }

      const skip = (page - 1) * limit;

      const [sortField = 'createdAt', sortOrder = 'desc'] =
        sort || 'createdAt:desc'.split(':');

      const total = await this.transactionModel.countDocuments(query);

      const transaction = await this.transactionModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort(sortField);

      return {
        data: transaction,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page < Math.ceil(total / limit),
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw new BadRequestException('unable to fetch the history');
    }
  }
}
