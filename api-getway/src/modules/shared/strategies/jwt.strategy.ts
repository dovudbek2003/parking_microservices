import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Observable, lastValueFrom } from "rxjs";
import { config } from "src/common/config/config";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.jwtSecretKey
        })
    }

    async validate(payload: { id: number }) {
        const userObservable: Observable<any> = await this.userService.findOne(payload.id);
        const { data: foundUser } = await lastValueFrom(userObservable)
        return foundUser
    }
}