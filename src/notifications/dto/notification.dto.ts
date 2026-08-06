import { Types } from "mongoose";

export class NotificationsDto {
  userId!: Types.ObjectId;
  title?: string;
  message?: string;
  type?: string;
  isRead?: Boolean;
}
