import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards()
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user)
    }
}