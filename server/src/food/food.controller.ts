import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { TableParser } from '../utils/table.parser';
import { FoodService } from './food.service';

@Controller()
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private tableParser: TableParser,
  ) {}
  @Get('/table/:day')
  async getTableForClient(@Req() req: Request, @Res() res: Response) {
    try {
      const data = this.tableParser.readTableByDay(+req.params.day);
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ message: 'Wrong data' });
    }
  }

  @Post('/postdata')
  async setTableData(@Req() req: Request, @Res() res: Response) {
    try {
      await this.tableParser.setTableData(req.body);
      res.status(200).json({ message: 'ok' });
    } catch (e) {
      console.log(e);
    }
  }
}
