import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/registerUser.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authServies: AuthService) {}

    @Post('register')
    @HttpCode(201)
    async register(@Body() registerUserDto: RegisterDto) {
        const token = await this.authServies.registerUser(registerUserDto)
        return token
    }
}