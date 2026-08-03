import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BeneficiariesDocument = HydratedDocument<Beneficiaries>

@Schema()

export class Beneficiaries {
    @Prop() 
    name?: string;
    @Prop()
    bankName?: string;
    @Prop()
    accountNumber?: string;
    @Prop()
    ifsc?: string;
};

export const BeneficiariesSchema = SchemaFactory.createForClass(Beneficiaries);