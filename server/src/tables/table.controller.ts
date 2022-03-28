import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { TableService } from './table.service';
import { UsersService } from '../users/users.service';
import { OrdersService } from '../orders/orders.service';

@Controller()
export class TableController {
  constructor(
    private readonly tableService: TableService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
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
      const user = await this.usersService.create(req.headers.authorization);
      await this.ordersService.create(req.body, user);
      await this.tableService.setTableData(req.body);
      res.status(200).json({ message: 'ok' });
    } catch (e) {
      console.log(e);
    }
  }
  @Get('api/download')
  async getTable(@Req() req: Request, @Res() res: Response) {
    try {
      const [file, fileName] = TableService.downloadParams();
      res.status(200).download(file, fileName);
    } catch (e) {
      console.log(e);
    }
  }
}
