import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TransactionDocument = HydratedDocument<Transactions>
@Schema()
export class Transactions {
    @Prop()
    amount?: string;

    @Prop()
    note?: string;

    @Prop()
    fromAccountId?: string;

    @Prop()
    toAccountId?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transactions)