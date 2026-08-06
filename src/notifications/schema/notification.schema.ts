import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type NotificationDocument = HydratedDocument<Notifications>;

@Schema()
export class Notifications {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId!: Types.ObjectId;
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
