import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type AccountDocument = HydratedDocument<Accounts>;

@Schema()
export class Accounts {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId!: Types.ObjectId;

  @Prop()
  accountName?: string;
  @Prop()
  currency?: string;
  @Prop()
  balance?: string;
}

export const AccountSchema = SchemaFactory.createForClass(Accounts);
