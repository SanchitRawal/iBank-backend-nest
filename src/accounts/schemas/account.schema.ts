import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AccountDocument = HydratedDocument<Accounts>

@Schema()
export class Accounts {
    @Prop()
    accountName?: string;
    currency?: string;
    balance?: string;
}

export const AccountSchema = SchemaFactory.createForClass(Accounts);
 