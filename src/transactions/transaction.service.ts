import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.type';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from './schema/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transactions.name)
    private transactionModel: Model<Transactions>,
  ) {}

  async newTransactionDetails(transactionDetails: TransactionDto) {
    if (!transactionDetails) {
      throw new BadRequestException('add some data');
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
    if(!transactionDetails) {
        throw new BadRequestException('add some to update')
    }
    try {
      const transaction = await this.transactionModel.findByIdAndUpdate(
        id,
        transactionDetails,
        { new: true, runValidators: true },
      );
      return transaction;
    } catch (error) {
        throw new BadRequestException('unable to update the transaction')
    }
  }

  async getSingleTransactionDetails (id: string) {
    try {
        const transaction = await this.transactionModel.findById(id);
        return transaction;
    } catch (error) {
        throw new BadRequestException('unable to fetch the data.')
    }
  }

  async deleteTransaction (id: string) {
    const transaction = await this.transactionModel.findByIdAndDelete(id);
    if(!transaction) {
        throw new BadRequestException('unable to delete the transaction')
    }
    return {message: ' transaction deleted succesfully'}
  }
}
