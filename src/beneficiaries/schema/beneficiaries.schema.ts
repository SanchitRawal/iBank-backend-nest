import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/schemas/user.schema";

export type BeneficiariesDocument = HydratedDocument<Beneficiaries>

@Schema()

export class Beneficiaries {
    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        required: true
    })
    userId!: Types.ObjectId;
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