import { Date, Types } from "mongoose";

export class TransactionDto {
    fromAccountId!: Types.ObjectId;
    transactionId?: string;
    toAccountId?: string;
    amount?: string;
    note?: string;
    mode?: string;
    status?: string;
    beneficiaryId?: Types.ObjectId
    userId?: Types.ObjectId;
    cardId?: Types.ObjectId;
}