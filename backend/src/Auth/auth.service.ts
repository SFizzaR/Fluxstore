import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class AuthService {

    constructor(private jwtService: JwtService) {

    }

    async login(user: any) {
        console.log(user)
        const payload = { username: user.Username, sub: user.Id };
        console.log(payload)
        return {

            access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET || 'secret' })

        };

    }

    async validate(payload: any) {

        return { userId: payload.sub, username: payload.username };

    }

}