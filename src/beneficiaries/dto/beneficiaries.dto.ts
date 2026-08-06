import { Types } from "mongoose";

export class BeneficiariesDto {
    name?: string;
    bankName?: string;
    accountNumber?: string;
    ifsc?: string;
    userId!: Types.ObjectId;
}