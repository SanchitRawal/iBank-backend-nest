import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notifications>;

@Schema()
export class Notifications {
  @Prop()
  title?: string;
  @Prop()
  message?: string;
  @Prop()
  type?: string;
  @Prop()
  isRead?: Boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notifications);
