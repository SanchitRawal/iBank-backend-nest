import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Beneficiaries } from './schema/beneficiaries.schema';
import { Model } from 'mongoose';
import { BeneficiariesDto } from './dto/beneficiaries.dto';
import { User } from 'src/users/schemas/user.schema';
import { first } from 'rxjs';

@Injectable()
export class BeneficiariesService {
  constructor(
    @InjectModel(Beneficiaries.name)
    private beneficiariesModel: Model<Beneficiaries>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async getList() {
    try {
      return await this.beneficiariesModel.find().populate('userId', 'firstName');
    } catch (error) {
      throw new BadRequestException('unable to the benefiaries list');
    }
  }

  async createBeneficiaries(benefiariesDetails: BeneficiariesDto) {
    if (!benefiariesDetails) {
      throw new BadRequestException('enter any details');
    }
    try {
      const newBenefiaries =
        await this.beneficiariesModel.create(benefiariesDetails);
      return newBenefiaries.save();
    } catch (error) {
      throw new BadRequestException('unable to create  the beneficiaries');
    }
  }

  async partialUpdate(id: string, benefiariesDetails: BeneficiariesDto) {
    if (!benefiariesDetails) {
      throw new BadRequestException('please enter the data');
    }
    try {
      const partialUpdate = await this.beneficiariesModel.findByIdAndUpdate(
        id,
        benefiariesDetails,
        { new: true, runValidators: true },
      );
      return partialUpdate;
    } catch (error) {
      throw new BadRequestException('Unable to update the record');
    }
  }

  async getSingleRecord(id: string) {
    try {
      return await this.beneficiariesModel.findById(id);
    } catch (error) {
      throw new BadRequestException('unable to find the record');
    }
  }

  async deleteRecord(id: string) {
    try {
      const record = await this.beneficiariesModel.findByIdAndDelete(id);
      if (!record) {
        throw new BadRequestException('device deleted succesfully');
      }
    } catch (error) {
      throw new BadRequestException('unable delete the record');
    }
  }
}
