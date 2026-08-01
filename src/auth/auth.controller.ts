import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/registerUser.dto";
import { LogInUserDto } from "./dto/logInUser.dto";
import { ForgotPassInUserDto } from "./dto/forgot-pass.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authServies: AuthService) {}

    @Post('register')
    @HttpCode(201)
    async register(@Body() registerUserDto: RegisterDto) {
        console.log('dadadas')
        const token = await this.authServies.registerUser(registerUserDto)
        return token
    }

    @Post('login')
    async logIn(@Body() logInDto: LogInUserDto) {
       const result = await this.authServies.signInUser(logInDto);
       return result;
    }

    @Post('forgot-password')
    @HttpCode(200)
    async forgot_pass(@Body() forgotpassDto: ForgotPassInUserDto) {
        const result = await this.authServies.forgot_pass(forgotpassDto);
        return result;
    }
}