import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LogInUserDto } from './dto/logInUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterDto) {
    const saltRound = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRound);
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { ...payload, access: token };
  }

  async signInUser(logInUserDto: LogInUserDto) {
    const signedInUser = await this.userService.findSingleUser(logInUserDto);
    if (!signedInUser) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (Boolean(signedInUser) && signedInUser?.password) {
      const isMatch = await bcrypt.compare(
        logInUserDto?.password || '',
        signedInUser.password,
      );
      if (!isMatch) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const payload = {
        id: signedInUser._id,
        email: signedInUser.email,
        role: signedInUser.role,
      };
      const token = await this.jwtService.signAsync(payload);
      return { ...payload, access: token };
    }
  }
}
