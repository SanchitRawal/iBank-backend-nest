import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { env } from 'node:process';
import { AccountsModule } from './accounts/account.module';
import { CardsModule } from './cards/cards.module';
import { TransactionModule } from './transactions/transaction.module';
import { BeneficiariesModule } from './beneficiaries/beneficiaries.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI_OFF ?? 'mongodb://localhost:27017/iBankdb'),
    AuthModule, 
    UserModule,
    AccountsModule,
    CardsModule,
    TransactionModule,
    BeneficiariesModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
