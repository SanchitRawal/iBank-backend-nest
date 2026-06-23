import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
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
      let errMsg = error as {message: string}
      if (err.code === 11000) {
        throw new ConflictException('email already registered.');
      }

      throw new InternalServerErrorException(errMsg);
    }
  }
}
