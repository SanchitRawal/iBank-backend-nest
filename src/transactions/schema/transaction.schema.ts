import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Accounts } from "src/accounts/schemas/account.schema";
import { User } from "src/users/schemas/user.schema";

export type TransactionDocument = HydratedDocument<Transactions>
@Schema()
export class Transactions {
    // @Prop({
    //     type: Types.ObjectId,
    //     ref: User.name,
    //     required: true
    // })
    // userId!: Types.ObjectId;

    @Prop()
    amount?: string;

    @Prop()
    note?: string;

    @Prop({
        type: Types.ObjectId,
        ref: Accounts.name,
        required: true
    })
    fromAccountId!: Types.ObjectId;

    @Prop()
    toAccountId?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transactions)