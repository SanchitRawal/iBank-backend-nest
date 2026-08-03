import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { NotificationsDto } from "./dto/notification.dto";
import { NotificationService } from "./notification.service";
import { PaginationDto } from "./dto/pagination.dto";

@Controller('notifications') 
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Get()
    async getAllNOtification (@Query() pagination: PaginationDto) {
        return this.notificationService.getAllNotification(pagination);
    }
    
    @Post()
    async createNotification (@Body() notificationDetails: NotificationsDto) {
        return this.notificationService.createNewNotification(notificationDetails)
    }
}