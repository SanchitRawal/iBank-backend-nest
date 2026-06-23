import { Injectable } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { RegisterDto } from "./dto/registerUser.dto";
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    async registerUser (registerUserDto: RegisterDto){
    const saltRound = 10
    const hash = await bcrypt.hash(registerUserDto?.password || '', saltRound )

        const user = await this.userService.createUser({...registerUserDto, password: hash})
        console.log(user);
        
        return{}
    }

    getSignIn(): string {
        return 'igsi'
    }
}