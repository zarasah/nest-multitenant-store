import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {PublicUserCreateDto} from "./dto/public.user.create.dto";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('register')
    async register(
        @Body() publicUserCreateDto: PublicUserCreateDto
    ) {
        return this.authService.registerPublicUser(publicUserCreateDto)
    }

    @Post('login')
    async loginPublic(@Body() loginDto: LoginDto) {
        return this.authService.loginPublic(loginDto);
    }
}
