import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { AccountsService } from "./account.service";

@Controller('account')
export class AccountController {
    @Get()
    async getAccounts () {

    }

    @Post()
    async createAccount () {

    }

    @Patch() 
    async updateAccount () {

    }

    @Delete()
    async deleteAccount () {
        
    }
}