import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    constructor(private readonly authServies: AuthService) {}

    @Get()
    getSample(): string {
        return this.authServies.getSampleData();
    }
}