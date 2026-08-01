import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardDocumnet = HydratedDocument<Cards>;

@Schema()
export class Cards {
  @Prop()
  holderName?: string;
  @Prop()
  number?: string;
  @Prop()
  expiry?: string;
  @Prop()
  cvv?: string;
}

export const CardsSchema = SchemaFactory.createForClass(Cards);
