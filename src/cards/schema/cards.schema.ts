import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Accounts } from 'src/accounts/schemas/account.schema';

export type CardDocumnet = HydratedDocument<Cards>;

@Schema()
export class Cards {
  @Prop({
    type: Types.ObjectId,
    ref: Accounts.name,
    required: true
  })
  accountId!: Types.ObjectId;
  @Prop()
  holderName?: string;
  @Prop()
  number?: string;
  @Prop()
  expiry?: string;
  @Prop()
  cvv?: string;
  @Prop()
  status?: string;
}

export const CardsSchema = SchemaFactory.createForClass(Cards);
