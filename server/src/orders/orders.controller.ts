import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get('api/all')
  async getAllOrders(@Req() req: Request, @Res() res: Response) {
    try {
      const orders = await this.ordersService.getAllOrders();
      await res.status(200).json(orders);
    } catch (e) {
      console.log(e);
      await res.status(500).json({ message: 'Wrong data' });
    }
  }
}
