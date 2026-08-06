import { Types } from "mongoose";

export class AccountsDto {
    accountName?: string;
    currency?: string;
    balance?: string;
    userId!: Types.ObjectId;
}