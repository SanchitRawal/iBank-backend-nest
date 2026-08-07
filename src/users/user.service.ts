import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model, Types } from 'mongoose';
import { LogInUserDto } from 'src/auth/dto/logInUser.dto';
import { UserDetails } from 'src/auth/dto/userDetails.dto';
import { Accounts } from 'src/accounts/schemas/account.schema';
import { Cards } from 'src/cards/schema/cards.schema';
import { Beneficiaries } from 'src/beneficiaries/schema/beneficiaries.schema';
import { lookup } from 'dns';
import { count } from 'console';
import { Role } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Accounts.name) private accountModel: Model<Accounts>,
    @InjectModel(Cards.name) private cardsModel: Model<Cards>,
    @InjectModel(Beneficiaries.name) private beneficiariesModel: Beneficiaries,
  ) {}
  async createUser(registerUserDto: RegisterDto) {
    try {
      const createUser = await this.userModel.create({
        firstName: registerUserDto?.firstName,
        lastName: registerUserDto?.lastName,
        email: registerUserDto?.email,
        password: registerUserDto?.password,
      });
      return createUser;
    } catch (error) {
      let err = error as { code?: Number };
      let errMsg = error as { message: string };
      if (err.code === 11000) {
        throw new ConflictException('email already registered.');
      }

      throw new InternalServerErrorException(errMsg);
    }
  }

  async findSingleUser(loginUserDto: LogInUserDto) {
    try {
      const findUser = await this.userModel.findOne({
        email: loginUserDto?.email,
      });
      return findUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findSingleUserAndUpdate(userDto: UserDetails) {
    await this.userModel.findByIdAndUpdate(
      userDto._id,
      { $set: { password: userDto?.password } },
      { new: true },
    );
    return {
      message: 'password updated succesfull',
    };
  }

  async getUserProfle() {
    const users = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'accounts',
          localField: '_id',
          foreignField: 'userId',
          as: 'accounts',
        },
      },
      {
        $lookup: {
          from: 'beneficiaries',
          localField: '_id',
          foreignField: 'userId',
          as: 'beneficiaries',
        },
      },
      {
        $lookup: {
          from: 'cards',
          localField: 'accounts._id',
          foreignField: 'accountId',
          as: 'cards',
        },
      },
      {
        $lookup: {
          from: 'notifications',
          localField: '_id',
          foreignField: 'userId',
          as: 'notifications',
        },
      },
      {
        $project: {
          firstName: 1,
          email: 1,
          role: 1,
          accountsCount: { $size: '$accounts' },
          cardsCount: { $size: '$cards' },
          beneficiariesCount: { $size: '$beneficiaries' },
          notificationsCount: { $size: '$notifications' },
        },
      },
    ]);
    return users;
  }
}
