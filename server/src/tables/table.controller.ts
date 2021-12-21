import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { TableService } from './table.service';
import { UsersService } from '../users/users.service';

@Controller()
export class TableController {
  constructor(
    private readonly tableService: TableService,
    private readonly usersService: UsersService,
  ) {}
  @Get('api/table/:day')
  async getTableForClient(@Req() req: Request, @Res() res: Response) {
    try {
      await this.tableService.readTable(process.env.OLD_TABLE);
      const data = this.tableService.readTableByDay(+req.params.day);
      await res.status(200).json(data);
    } catch (e) {
      await res.status(500).json({ message: 'Wrong data' });
    }
  }

  @Post('api/postdata')
  async setTableData(@Req() req: Request, @Res() res: Response) {
    try {
      await this.usersService.setUserOrders(
        req.headers.authorization,
        req.body,
      );
      await this.tableService.setTableData(req.body);
      res.status(200).json({ message: 'ok' });
    } catch (e) {
      console.log(e);
    }
  }
}
