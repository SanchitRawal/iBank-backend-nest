
import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../user.types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName?: string;

 @Prop()
  lastName?: string;

 @Prop({required: true})
  password?: string;

  @Prop({required: true, unique: true})
  email?: string;

  @Prop({default: Role.Admin})
  role?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
