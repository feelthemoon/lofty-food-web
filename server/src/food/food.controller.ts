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
  @Get('/table/:day/:page')
  async getTableForClient(@Req() req: Request, @Res() res: Response) {
    try {
      await this.tableParser.downloadFile(
        process.env.APP_REMOTE_URL,
        process.env.OLD_TABLE,
      );
      const data = this.tableParser.readTableByDayAndPage(
        +req.params.day,
        +req.params.page,
      );
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ message: 'Wrong data' });
    }
  }
}
