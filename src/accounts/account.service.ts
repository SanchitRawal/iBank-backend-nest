import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Accounts } from './schemas/account.schema';
import { Model } from 'mongoose';
import { AccountsDto } from './dto/account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Accounts.name) private accountModel: Model<Accounts>,
  ) {}

  async createAccount(accountData: AccountsDto) {
    console.log(accountData, 'accountsData');
    if (!accountData) {
      throw new BadRequestException(
        'please add on the data name, currency or balance',
      );
    }
    try {
      const newAccount = await this.accountModel.create(accountData);
      return newAccount.save();
    } catch (error) {
      throw new BadRequestException('Unable to create a account');
    }
  }

  async getSingleAccountDetail(id?: string) {
    try {
        const getOneAccount = await this.accountModel.findById(id);
        console.log(getOneAccount)
        return getOneAccount
    } catch (error) {
      throw new BadRequestException('unable to fetch the single account');
    }
  }
  
  async getAccountsList () {
    try {
      const list = await this.accountModel.find();
      return list
    } catch (error) {
      throw new BadRequestException('unablet to fetch the list of accounts')
    }
  }
}
