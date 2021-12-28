import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('api/user')
  async getTableForClient(@Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.userService.decodeJWT(req.headers.authorization);
      const allowedUsers = await this.userService.getAllowedUsers();

      if (allowedUsers.members.includes(user['https://slack.com/user_id'])) {
        return await res.status(200).json(user);
      }
      return await res
        .status(403)
        .json({ message: 'У вас нет доступа к данному сервису' });
    } catch (e) {
      await res.status(500).json({ message: 'Wrong data' });
    }
  }
}
