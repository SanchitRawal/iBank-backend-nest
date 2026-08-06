import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.type';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAllTransactions() {
    return this.transactionService.getTransactionsList();
  }

  
    @Get('transfer')
    async transfer () {
      return await this.transactionService.transferTransaction()
    }
  @Get(':id')
  async getSingleTransaction(@Param('id') id: string) {
    return await this.transactionService.getSingleTransactionDetails(id);
  }

  @Post()
  async createTransaction(@Body() transactionDetails: TransactionDto) {
    return await this.transactionService.newTransactionDetails(
      transactionDetails,
    );
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body() transactionDetails: TransactionDto,
  ) {
    return await this.transactionService.partialUpdate(id, transactionDetails);
  }

  @Delete(':id')
  async removeTransaction(@Param('id') id: string) {
    return await this.transactionService.deleteTransaction(id);
  }

  // transfer api
}
