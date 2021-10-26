import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import {UserService} from "./user.service";

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    @Get('/user')
    async getTableForClient(@Req() req: Request, @Res() res: Response) {
        try {
            const user = await this.userService.decodeJWT(req.headers.authorization);
            await res.status(200).json(user);
        } catch (e) {
            console.log(e)
            await res.status(500).json({ message: 'Wrong data' });
        }
    }

}
