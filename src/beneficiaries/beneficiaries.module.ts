import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BeneficiariesController } from './beneficiaries.controller';
import {
  Beneficiaries,
  BeneficiariesSchema,
} from './schema/beneficiaries.schema';
import { BeneficiariesService } from './beneficiaries.service';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Beneficiaries.name, schema: BeneficiariesSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [BeneficiariesService],
  controllers: [BeneficiariesController],
})
export class BeneficiariesModule {}
