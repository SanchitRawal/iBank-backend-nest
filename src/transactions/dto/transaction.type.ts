import { Types } from "mongoose";

export class TransactionDto {
    fromAccountId!: Types.ObjectId;
    toAccountId?: string;
    amount?: string;
    note?: string;
    // userId!: Types.ObjectId;
}