import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Notifications, NotificationSchema } from "./schema/notification.schema";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";

@Module({
    imports:[MongooseModule.forFeature([{name: Notifications.name, schema: NotificationSchema}])],
    providers:[NotificationService],
    controllers:[NotificationController]
})

export class NotificationModule {}