import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get('api/all/:page')
  async getAllOrders(@Req() req: Request, @Res() res: Response) {
    try {
      const response = await this.ordersService.getAllOrders(req.params.page);
      await res.status(200).json(response);
    } catch (e) {
      console.log(e);
      await res.status(500).json({ message: 'Wrong data' });
    }
  }
}
