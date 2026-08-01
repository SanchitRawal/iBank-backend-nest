import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountsService } from './account.service';
import { AccountsDto } from './dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountsService) {}
  @Get()
  async getAccountsList() {
    const result = await this.accountService.getAccountsList();
    return result;
  }

  @Get(':id')
  async getOneAccount(@Param('id') id: string) {
    const result = await this.accountService.getSingleAccountDetail(id);
    return result;
  }

  @Post()
  async createAccount(@Body() accountsDetails: AccountsDto) {
    const result = await this.accountService.createAccount(accountsDetails);
    return result;
  }

  @Patch(':id')
  async updateAccount(
    @Param('id') id: string,
    @Body() accountUpdateData: AccountsDto,
  ) {
    const result = await this.accountService.partialAccountUpdate(
      id,
      accountUpdateData,
    );
    return result;
  }

  @Delete()
  async deleteAccount() {}
}
