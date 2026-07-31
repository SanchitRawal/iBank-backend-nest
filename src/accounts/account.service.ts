import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Accounts } from "./schemas/account.schema";
import { Model } from "mongoose";

@Injectable()
export class AccountsService {
    constructor(@InjectModel(Accounts.name) private accountModel: Model<Accounts>) {}
    
}