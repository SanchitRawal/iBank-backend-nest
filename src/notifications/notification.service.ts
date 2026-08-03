import {
  BadRequestException,
  Body,
  Get,
  Injectable,
  Post,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { NotificationsDto } from './dto/notification.dto';
import { Notifications } from './schema/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notifications.name)
    private notificationModel: Model<Notification>,
  ) {}

  async getAllNotification(pagination: PaginationDto) {
    return await this.notificationModel
      .find()
      .skip(pagination.skip ?? 0)
      .limit(pagination.limit ?? DEFAULT_PAGE_SIZE);
  }

  async createNewNotification(@Body() notificationDetails: NotificationsDto) {
    try {
      const newNotification =
        await this.notificationModel.create(notificationDetails);
      return await newNotification.save();
    } catch (error) {
      throw new BadRequestException('unable to load the notification');
    }
  }
}
