import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterDto) {
    const saltRound = 10;
    const hash = await bcrypt.hash(registerUserDto?.password || '', saltRound);
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { ...payload, access: token };
  }

  getSignIn(): string {
    return 'igsi';
  }
}
