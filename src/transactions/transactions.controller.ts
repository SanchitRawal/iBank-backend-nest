import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionHistoryDto } from './dto/transactionHistory.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAllTransactions() {
    return this.transactionService.getTransactionsList();
  }

  @Get('transfer')
  async transfer() {
    return await this.transactionService.transferTransaction();
  }

  @Get('analytics')
  async getAnalysis() {
    return this.transactionService.getAnalaytics();
  }

  @Get('hisotry')
  async getTransactionHistory(
    @Req() req,
    @Query() filters: TransactionHistoryDto) {
    return await this.transactionService.getTransactionHistories(req.user.userId, filters);
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
}
