import { Controller, Get, Param } from "@nestjs/common";
import { DashBoardService } from "./dashBoard.service";

@Controller('dashboard')
export class DashBoardController{
    constructor(private readonly dashboardServices: DashBoardService) {}

    @Get(':userId')
    async getDashBoardDetails (@Param('userId') userId: string) {
        return await this.dashboardServices.dashBoardDetails(userId)
    }
}