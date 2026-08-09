import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Accounts } from "src/accounts/schemas/account.schema";
import { User } from "src/users/schemas/user.schema";

export type TransactionDocument = HydratedDocument<Transactions>
@Schema({timestamps: true})
export class Transactions {
    // @Prop({
    //     type: Types.ObjectId,
    //     ref: User.name,
    //     required: true
    // })
    // userId!: Types.ObjectId;
    @Prop({
        type: Types.ObjectId,
        ref: Accounts.name,
        required: true
    })
    fromAccountId!: Types.ObjectId;

    @Prop()
    toAccountId?: string;

    @Prop()
    beneficiaryId?: Types.ObjectId;

    @Prop()
    cardId?: Types.ObjectId;

    @Prop()
    type?: string;

    @Prop()
    status?: string;

    @Prop()
    mode?: string;

    @Prop()
    transactionId?: string;

    @Prop()
    amount?: string;

    @Prop()
    note?: string;

}

export const TransactionSchema = SchemaFactory.createForClass(Transactions)